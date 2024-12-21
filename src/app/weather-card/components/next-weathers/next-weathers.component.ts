import { Component, computed, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
	selector: 'app-next-weathers',
	imports: [DatePipe],
	templateUrl: './next-weathers.component.html',
	styleUrl: './next-weathers.component.scss',
})
export class NextWeathersComponent {
	private weatherService = inject(WeatherService);
	next = this.weatherService.next;

	gridTemplateColumns = computed(() => {
		const next = this.next();
		if (!next) return 'unset';
		return `repeat(${next.length + (next.length - 1)}, 1fr)`;
	});
}
