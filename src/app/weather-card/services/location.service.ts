import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Location } from '../types/location';
import { WeatherCords } from '../types/weather';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // States
  private _location = signal<Location | undefined>(undefined);
  private _searchLocation = signal<WeatherCords | undefined>(undefined);
  // Getters
  readonly location = computed(() => this._location());
  readonly searchLocation$ = toObservable(this._searchLocation).pipe(
    distinctUntilChanged((prev, curr) => prev?.lat === curr?.lat || prev?.lon === curr?.lon)
  );

  constructor() {
    // Reducers
    this.requestNativeLocation()
      .pipe(takeUntilDestroyed())
      .subscribe((geolocation) => {
        this._searchLocation.set({ lat: geolocation.coords.latitude, lon: geolocation.coords.longitude });
      });
  }

  setLocation(location: Location) {
    this._location.set(location);
  }

  private requestNativeLocation() {
    return fromPromise<GeolocationPosition>(
      new Promise((resolve, reject) => {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(resolve, reject);
        else reject(new Error('Geolocation is not supported by this browser.'));
      })
    );
  }
}
