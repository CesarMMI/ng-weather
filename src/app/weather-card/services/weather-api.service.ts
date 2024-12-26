import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { WeatherApiCords } from '../types/weather-api/weather-api';
import { WeatherApiCurrentResponse } from '../types/weather-api/weather-api-current';
import { WeatherApiForecastResponse } from '../types/weather-api/weather-api-forecast';

@Injectable({
	providedIn: 'root',
})
export class WeatherApiService extends HttpService {
	private appid = environment.weatherApiKey;
	protected override url = environment.weatherApiUrl;
	protected override urlDebug = environment.weatherApiUrlDebug;

	getWeather(search: WeatherApiCords) {
		return this.get<WeatherApiCurrentResponse>('/data/2.5/weather', {
			lat: search.lat,
			lon: search.lon,
		});
	}

	getForecast(search: WeatherApiCords) {
		return this.get<WeatherApiForecastResponse>('/data/2.5/forecast', {
			lat: search.lat,
			lon: search.lon,
		});
	}

	getLocation(query: string) {
		return this.get<WeatherApiForecastResponse>('/geo/1.0/direct', {
			q: query,
		});
	}

	protected override get<T>(
		endpoint: string,
		params: { [prop: string]: any }
	): Observable<T> {
		params = { ...params, appid: this.appid };
		return super.get(endpoint, params);
	}
}
