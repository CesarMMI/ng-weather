import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, forkJoin, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { Forecast } from '../types/forecast';
import { Temperature, TemperatureType } from '../types/temperature';
import { Weather } from '../types/weather';
import { WeatherApi, WeatherApiCords } from '../types/weather-api/weather-api';
import { WeatherApiCurrentResponse } from '../types/weather-api/weather-api-current';
import { WeatherApiForecastResponse } from '../types/weather-api/weather-api-forecast';
import { LocationService } from './location.service';

@Injectable({
	providedIn: 'root',
})
export class WeatherService extends HttpService {
	private locationService = inject(LocationService);
	private appid = environment.weatherApiKey;
	protected override url = environment.weatherApiUrl;
	protected override urlDebug = environment.weatherApiUrlDebug;
	// States
	private _current = signal<WeatherApiCurrentResponse | undefined>(undefined);
	private _forecast = signal<WeatherApiForecastResponse | undefined>(undefined);
	private _temperature = signal<Temperature>(new Temperature('celsius'));
	// Getters
	weather: Signal<Weather | undefined> = computed(() => {
		const weather = this._current();
		if (!weather) return;
		return this.getWeather(weather, this._temperature());
	});
	forecast: Signal<Forecast[] | undefined> = computed(() => {
		const forecast = this._forecast();
		if (!forecast) return;
		return this.getForecastList(forecast, this._temperature());
	});
	temperatureType = computed(() => this._temperature().type);

	constructor() {
		super();
		// Reducers
		this.locationService.searchLocation$
			.pipe(
				takeUntilDestroyed(),
				filter(Boolean),
				switchMap((search) =>
					forkJoin({
						current: this.requestCurrent(search),
						forecast: this.requestForecast(search),
					})
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

	setTemperatureType(type: TemperatureType) {
		this._temperature.set(new Temperature(type));
	}

	private requestCurrent(search: WeatherApiCords) {
		return this.get<WeatherApiCurrentResponse>('weather', { lat: search.lat, lon: search.lon, appid: this.appid });
	}

	private requestForecast(search: WeatherApiCords) {
		return this.get<WeatherApiForecastResponse>('forecast', { lat: search.lat, lon: search.lon, appid: this.appid });
	}

	private getWeather(weather: WeatherApiCurrentResponse, temperature: Temperature) {
		return {
			clouds: weather.clouds.all,
			humidity: weather.main.humidity,
			temperature: new Temperature(temperature.type, weather.main.temp),
			wind: Math.round(weather.wind.speed * 3.6),
		};
	}

	private getForecastList(forecast: WeatherApiForecastResponse, temperature: Temperature) {
		const result: Forecast[] = [];
		for (const item of forecast.list) {
			result.push({
				date: new Date(item.dt * 1000),
				temperature: new Temperature(temperature.type, item.main.temp),
			});
		}
		return result;
	}
}
