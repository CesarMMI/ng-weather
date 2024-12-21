import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, forkJoin, switchMap } from 'rxjs';
import { WeatherCords } from '../types/weather';
import { WeatherForecast, WeatherForecastList } from '../types/weather-forecast';
import { WeatherCurrentResponse } from './../types/weather-current';
import { LocationService } from './location.service';
import { HttpService } from '../../shared/services/http.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class WeatherService extends HttpService {
	private locationService = inject(LocationService);

	private appid = environment.weatherApiKey;
	protected override url = environment.weatherApiUrl;
	protected override urlDebug = environment.weatherApiUrlDebug;
	// States
	private _current = signal<WeatherCurrentResponse | undefined>(undefined);
	private _forecast = signal<WeatherForecast | undefined>(undefined);
	// Getters
	readonly current = computed(() => {
		const weather = this._current();
		if (!weather) return;
		return {
			temps: this.calcTemps(weather.main.temp),
			clouds: weather.clouds.all,
			humidity: weather.main.humidity,
			wind: Math.round(weather.wind.speed * 3.6),
		};
	});
	readonly next = computed(() => {
		const forecast = this._forecast();
		if (!forecast) return;
		const groups = this.groupForecast(forecast);
		return this.calcGroupForecastMedian(groups);
		return this.calcGroupForecastAverage(groups);
	});

	constructor() {
		super();
		// Reducers
		this.locationService.searchLocation$
			.pipe(
				takeUntilDestroyed(),
				filter(Boolean),
				switchMap((search) =>
					forkJoin({ current: this.requestCurrent(search), forecast: this.requestForecast(search) })
				)
			)
			.subscribe((res) => {
				// Current
				this._current.set({ ...res.current, dt: new Date(res.current.dt) });
				this._forecast.set(res.forecast);
				// Forecast
				this.locationService.setLocation({ name: res.current.name, country: res.current.sys.country });
			});
	}

	private requestCurrent(search: WeatherCords) {
		return this.get<WeatherCurrentResponse>('weather', { lat: search.lat, lon: search.lon, appid: this.appid });
	}

	private requestForecast(search: WeatherCords) {
		return this.get<WeatherForecast>('forecast', { lat: search.lat, lon: search.lon, appid: this.appid });
	}

	private calcTemps(tempKelvin: number) {
		return {
			celsius: Math.trunc(tempKelvin - 273.15),
			fahrenheit: Math.trunc(((tempKelvin - 273.15) * 9) / 5 + 32),
		};
	}

	private groupForecast(forecast: WeatherForecast) {
		const groups: Record<string, WeatherForecastList[]> = {};
		const today = new Date().getDate();
		for (const item of forecast.list) {
			const date = new Date(item.dt * 1000);
			if (date.getDate() === today) continue;

			const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			if (!groups[key]) {
				groups[key] = [];
			}
			groups[key].push(item);
		}
		return groups;
	}

	private calcGroupForecastAverage(groups: Record<string, WeatherForecastList[]>) {
		const results: { date: string; temp: { celsius: number; fahrenheit: number } }[] = [];

		for (const [key, group] of Object.entries(groups)) {
			const tempSum = group.reduce((sum, item) => sum + item.main.temp, 0);
			const avgTemp = tempSum / group.length;
			const result = { date: key, temp: this.calcTemps(avgTemp) };
			results.push(result);
		}

		return results;
	}

	private calcGroupForecastMedian(groups: Record<string, WeatherForecastList[]>) {
		const results: { date: string; temp: { celsius: number; fahrenheit: number } }[] = [];

		for (const [key, group] of Object.entries(groups)) {
			const temps = group.map((item) => item.main.temp);
			const medianTemp = this.calcMedian(temps);
			const result = { date: key, temp: this.calcTemps(medianTemp) };
			results.push(result);
		}

		return results;
	}

	private calcMedian(values: number[]): number {
		if (values.length === 0) return 0;

		const sorted = values.slice().sort((a, b) => a - b);
		const mid = Math.floor(sorted.length / 2);

		return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
	}
}
