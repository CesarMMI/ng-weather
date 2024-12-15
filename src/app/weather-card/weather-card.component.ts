import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-weather-card',
  imports: [DatePipe],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  private weatherService = inject(WeatherService);
  location = this.weatherService.location;
  temp = this.weatherService.temp;

  tempMode = [
    { label: 'ºC', key: 'celsius' },
    { label: 'ºF', key: 'fahrenheit' },
    { label: 'K', key: 'kelvin' },
  ];
  currentTempMode: 'kelvin' | 'celsius' | 'fahrenheit' = 'celsius';
}
