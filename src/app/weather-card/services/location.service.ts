import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, EMPTY, Subject, switchMap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { StorageService } from '../../shared/services/storage.service';
import { WeatherApiCords } from '../types/weather-api/weather-api';
import { WeatherApiService } from './weather-api.service';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	private storageService = inject(StorageService);
	private weatherApiService = inject(WeatherApiService);
	// States
	private _locationName = signal<string>('');
	private _cords = signal<WeatherApiCords | undefined>(this.storageService.get('cords'));
	// Actions
	private queryLocation$ = new Subject<string>();
	private browserLocation$ = new Subject<void>();
	// Getters
	readonly locationName = computed(() => this._locationName());
	readonly cords$ = toObservable(this._cords).pipe(
		distinctUntilChanged((prev, curr) => {
			return prev?.lat === curr?.lat || prev?.lon === curr?.lon;
		})
	);

	constructor() {
		// Reducers
		this.browserLocation$
			.pipe(
				switchMap(() => this.browserLocation()),
				catchError(() => EMPTY),
				takeUntilDestroyed()
			)
			.subscribe((geolocation) => {
				this.setCords(geolocation.coords.latitude, geolocation.coords.longitude);
			});
		this.queryLocation$
			.pipe(
				switchMap((query) => this.weatherApiService.getLocation(query)),
				catchError(() => EMPTY),
				takeUntilDestroyed()
			)
			.subscribe((location) => {
				this.setCords(location.lat, location.lon);
			});

		if (!this._cords()) this.setNavigatorGeolocation();
	}

	searchLocation(query: string) {
		this.queryLocation$.next(query);
	}

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

	private setCords(lat: number, lon: number) {
		this._cords.set({ lat, lon });
		this.storageService.save('cords', this._cords());
	}
}
