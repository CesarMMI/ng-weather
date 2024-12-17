import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, switchMap } from 'rxjs';
import { LocationService } from './location.service';
import { SearchLocation } from '../types/search-location';
import { WeatherCurrentResponse } from './../types/weather-current';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private locationService = inject(LocationService);
  // States
  private _weather = signal<WeatherCurrentResponse | undefined>(undefined);
  // Getters
  readonly weather = computed(() => {
    const weather = this._weather();
    if (!weather) return;
    return {
      temps: this.calcTemps(weather.main.temp),
      clouds: weather.clouds.all,
      humidity: weather.main.humidity,
      wind: Math.round(weather.wind.speed * 3.6),
    };
  });

  constructor() {
    // Reducers
    this.locationService.searchLocation$
      .pipe(
        takeUntilDestroyed(),
        filter(Boolean),
        distinctUntilChanged((prev, curr) => {
          return prev.lat === curr.lat || prev.lon === curr.lon;
        }),
        switchMap((search) => this.requestCurrent(search))
      )
      .subscribe((res) => {
        this._weather.set({ ...res, dt: new Date(res.dt) });
        this.locationService.setLocation({
          name: res.name,
          country: res.sys.country,
        });
      });
  }

  private requestCurrent(search: SearchLocation) {
    return this.http.get<WeatherCurrentResponse>('json/weather/current.json', {
      params: {
        lat: search.lat,
        lon: search.lon,
        appid: 'appid',
      },
    });
  }

  private calcTemps(tempKelvin: number) {
    return {
      kelvin: Math.trunc(tempKelvin),
      celsius: Math.trunc(tempKelvin - 273.15),
      fahrenheit: Math.trunc(((tempKelvin - 273.15) * 9) / 5 + 32),
    };
  }
}
