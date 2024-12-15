import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { GeolocationService } from '../geolocation.service';
import {
  WeatherCurrentResponse
} from './types/weather-current';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private geolocationService = inject(GeolocationService);

  private weather = toSignal(
    this.geolocationService.current$.pipe(
      filter((cords) => !!cords),
      switchMap((cords) =>
        this.http.get<WeatherCurrentResponse>('json/weather/current.json', {
          params: {
            lat: cords.coords.latitude,
            lon: cords.coords.longitude,
            appid: 'appid',
          },
        })
      )
    )
  );

  location = computed(() => {
    const weather = this.weather();
    if (!weather) return;
    return {
      date: new Date(weather.dt * 1000),
      name: weather.name,
      country: weather.sys.country,
    };
  });

  temp = computed(() => {
    const weather = this.weather();
    if (!weather) return;
    return {
      kelvin: Math.trunc(weather.main.temp),
      celsius: Math.trunc(weather.main.temp - 273.15),
      fahrenheit: Math.trunc(((weather.main.temp - 273.15) * 9) / 5 + 32),
    };
  });
}
