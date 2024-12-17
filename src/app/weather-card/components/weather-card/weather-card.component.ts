import { Component } from '@angular/core';
import { GlassmorphismDirective } from '../../../shared/directives/glassmorphism.directive';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { LocationInputComponent } from '../location-input/location-input.component';

@Component({
  selector: 'app-weather-card',
  imports: [
    GlassmorphismDirective,
    LocationInputComponent,
    CurrentWeatherComponent,
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {}
