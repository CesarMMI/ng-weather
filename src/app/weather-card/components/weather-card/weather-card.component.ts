import { Component } from '@angular/core';
import { GlassmorphismDirective } from '../../../shared/directives/glassmorphism.directive';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { LocationInputComponent } from '../location-input/location-input.component';
import { NextWeathersComponent } from '../next-weathers/next-weathers.component';

@Component({
	selector: 'app-weather-card',
	imports: [GlassmorphismDirective, LocationInputComponent, CurrentWeatherComponent, NextWeathersComponent],
	templateUrl: './weather-card.component.html',
	styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {}
