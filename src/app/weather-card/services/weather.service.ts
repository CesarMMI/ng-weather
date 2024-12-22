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
		return this.getForecastList(forecast);
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

	private getForecastList(forecast: WeatherForecast) {
		return forecast.list.map((item) => ({ temp: item.main.temp, dt: new Date(item.dt * 1000) }));
	}
}
