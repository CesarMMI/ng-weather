import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { TemperatureType } from '../../types/weather/temperature';

@Component({
	selector: 'app-current-weather',
	imports: [],
	templateUrl: './current-weather.component.html',
	styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
	private weatherService = inject(WeatherService);
	weather = this.weatherService.current;
	temperatureType = this.weatherService.temperatureType;

	setTemperatureType(type: TemperatureType) {
		this.weatherService.setTemperatureType(type);
	}
}
