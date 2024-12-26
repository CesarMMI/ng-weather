import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
	catchError,
	distinctUntilChanged,
	EMPTY,
	Subject,
	switchMap,
} from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { WeatherApiCords } from '../types/weather-api/weather-api';
import { WeatherApiService } from './weather-api.service';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	private weatherApiService = inject(WeatherApiService);
	// States
	private _locationName = signal<string>('');
	private _cords = signal<WeatherApiCords | undefined>(undefined);
	// Actions
	private queryLocation$ = new Subject<string>();
	private browserLocation$ = new Subject<void>();
	// Getters
	readonly locationName = computed(() => this._locationName());
	readonly cords$ = toObservable(this._cords).pipe(
		distinctUntilChanged((prev, curr) => {
			return prev?.lat === curr?.lat || prev?.lon === curr?.lon
		})
	);

	constructor() {
		// Reducers
		this.browserLocation$.pipe(
			switchMap(() => this.browserLocation()),
			catchError(() => EMPTY),
			takeUntilDestroyed()
		).subscribe((geolocation) => {
			this._cords.set({
				lat: geolocation.coords.latitude,
				lon: geolocation.coords.longitude,
			});
		});
		this.queryLocation$.pipe(
			switchMap((q) => this.weatherApiService.getLocation(q)),
			catchError(() => EMPTY),
			takeUntilDestroyed()
		).subscribe((geolocation) => {
			console.log(geolocation)
		});
	}

	searchLocation(query: string) {}

	setLocationName(name: string) {
		this._locationName.set(name);
	}

	setNavigatorGeolocation() {
		this.browserLocation$.next();
	}

	private browserLocation() {
		return fromPromise<GeolocationPosition>(
			new Promise((resolve, reject) => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(resolve, reject);
				} else {
					reject(new Error('Geolocation is not supported by this browser.'));
				}
			})
		);
	}
}
