import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, forkJoin, switchMap } from 'rxjs';
import { WeatherApiCurrentResponse } from '../types/weather-api/weather-api-current';
import { WeatherApiForecastResponse } from '../types/weather-api/weather-api-forecast';
import { Forecast } from '../types/weather/forecast';
import { Temperature, TemperatureType } from '../types/weather/temperature';
import { Weather } from '../types/weather/weather';
import { LocationService } from './location.service';
import { WeatherApiService } from './weather-api.service';

@Injectable({
	providedIn: 'root',
})
export class WeatherService {
	private locationService = inject(LocationService);
	private weatherApiService = inject(WeatherApiService);
	// States
	private _current = signal<WeatherApiCurrentResponse | undefined>(undefined);
	private _forecast = signal<WeatherApiForecastResponse | undefined>(undefined);
	private _temperature = signal<Temperature>(new Temperature('celsius'));
	// Getters
	current: Signal<Weather | undefined> = computed(() => {
		return this.getWeather(this._temperature(), this._current());
	});
	current$ = toObservable(this._current);

	forecast: Signal<Forecast[] | undefined> = computed(() => {
		return this.getForecastList(this._temperature(), this._forecast());
	});

	temperatureType = computed(() => this._temperature().type);

	constructor() {
		// Reducers
		this.locationService.cords$
			.pipe(
				filter(Boolean),
				switchMap((search) =>
					forkJoin({
						current: this.weatherApiService.getWeather(search),
						forecast: this.weatherApiService.getForecast(search),
					})
				),
				takeUntilDestroyed()
			)
			.subscribe((res) => {
				// Current
				this._current.set({ ...res.current, dt: new Date(res.current.dt) });
				this._forecast.set(res.forecast);
				// Forecast
				const locationName = `${res.current.name} / ${res.current.sys.country}`;
				this.locationService.setLocationName(locationName);
			});
	}

	setTemperatureType(type: TemperatureType) {
		this._temperature.set(new Temperature(type));
	}

	private getWeather(temperature: Temperature, weather?: WeatherApiCurrentResponse) {
		if (!weather) return;

		return {
			clouds: weather.clouds.all,
			humidity: weather.main.humidity,
			temperature: new Temperature(temperature.type, weather.main.temp),
			wind: Math.round(weather.wind.speed * 3.6),
		};
	}

	private getForecastList(temperature: Temperature, forecast?: WeatherApiForecastResponse) {
		if (!forecast) return;

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
