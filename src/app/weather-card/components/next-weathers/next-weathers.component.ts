import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WeatherService } from '../../services/weather.service';

@Component({
	selector: 'app-next-weathers',
	providers: [DatePipe],
	imports: [BaseChartDirective],
	templateUrl: './next-weathers.component.html',
	styleUrl: './next-weathers.component.scss',
})
export class NextWeathersComponent {
	private datePipe = inject(DatePipe);
	private weatherService = inject(WeatherService);

	private next = this.weatherService.next;

	chart = computed(() => {
		const next = this.next();
		if (!next) return;
		return {
			data: this.getChartData(next),
			options: this.getChartOptions(next),
		} as ChartConfiguration;
	});

	private getChartData(next: { dt: Date; temp: number }[]) {
		return {
			labels: next.map((item) => item.dt),
			datasets: [
				{
					xAxisID: 'x',
					yAxisID: 'y',
					pointRadius: 0,
					borderWidth: 2,
					borderColor: '#d4d4d4',
					data: next.map((item) => item.temp),
				},
			],
		} as ChartData;
	}

	private getChartOptions(next: { dt: Date; temp: number }[]) {
		return {
			layout: { padding: 0 },
			plugins: { legend: { display: false } },
			interaction: { mode: 'index', intersect: false },
			scales: {
				x: {
					border: { display: false },
					backgroundColor: 'transparent',
					position: 'top',
					grid: { color: '#73737355' },
					ticks: { callback: this.getXTick(next), color: '#d4d4d4' },
				},
				y: {
					display: false,
					grid: { display: false },
					ticks: { display: false },
				},
			},
		} as ChartOptions;
	}

	private getXTick(next: { dt: Date; temp: number }[]) {
		return (tickValue: number, index: number) => {
			const date = next[index].dt;
			if (date.getHours() !== 0) return;
			return this.datePipe.transform(date, 'EE');
		};
	}
}
