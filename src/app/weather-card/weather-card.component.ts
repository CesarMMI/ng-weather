import { Component } from '@angular/core';
import { GlassmorphismDirective } from '../shared/directives/glassmorphism.directive';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { LocationInputComponent } from './components/location-input/location-input.component';
import { NextWeathersComponent } from './components/next-weathers/next-weathers.component';

@Component({
	selector: 'app-weather-card',
	imports: [GlassmorphismDirective, LocationInputComponent, CurrentWeatherComponent, NextWeathersComponent],
	template: `
		<div class="h-screen w-screen flex items-center justify-center">
			<main appGlassmorphism class="grid gap-4" [style.width]="'min(500px, 90vw)'">
				<app-location-input />
				<app-current-weather />
				<app-next-weathers />
			</main>
		</div>
	`,
})
export class WeatherCardComponent {}
