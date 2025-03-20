import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../../shared/services/http.service';
import { WeatherService } from '../../weather-card/services/weather.service';
import { WeatherApiCurrentResponse } from '../../weather-card/types/weather-api/weather-api-current';
import { RandomImageResponse } from '../types/random-image';

@Injectable({
	providedIn: 'root',
})
export class ImageService extends HttpService {
	private weatherService = inject(WeatherService);

	private client_id = environment.imagesApiKey;
	protected override url = environment.imagesApiUrl;
	protected override urlDebug = environment.imagesApiUrlDebug;
	// States
	private _imageUrl = signal<string | undefined>(undefined);
	// Getters
	imageUrl = computed(() => this._imageUrl());

	constructor() {
		super();
		// Reducers
		this.weatherService.current$
			.pipe(
				filter((weather) => !!weather && weather.weather.length > 0),
				switchMap((weather) => this.getRandom(this.getQuery(weather!))),
				takeUntilDestroyed()
			)
			.subscribe((res) => {
				this._imageUrl.set(res.urls.regular);
			});
	}

	private getQuery(weather: WeatherApiCurrentResponse) {
		const dayPeriod = this.getDayPeriod();
		const query = `${weather?.weather[0].description} ${dayPeriod}`;
		return query;
	}

	private getDayPeriod(): string {
		const now = new Date();
		const hours = now.getHours();

		if (hours >= 5 && hours < 12) {
			return 'morning';
		} else if (hours >= 12 && hours < 17) {
			return 'afternoon';
		} else if (hours >= 17 && hours < 21) {
			return 'evening';
		} else {
			return 'night';
		}
	}

	private getRandom(query: string) {
		return this.get<RandomImageResponse>('/photos/random', {
			query,
			client_id: this.client_id,
		});
	}
}
