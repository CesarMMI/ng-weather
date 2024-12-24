import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WeatherService } from '../../services/weather.service';
import { Forecast } from '../../types/forecast';

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

	private forecast = this.weatherService.forecast;

	chart = computed(() => {
		const forecast = this.forecast();
		if (!forecast) return;
		return {
			data: this.getChartData(forecast),
			options: this.getChartOptions(forecast),
		} as ChartConfiguration;
	});

	private getChartData(forecast: Forecast[]) {
		return {
			labels: forecast.map((item) => item.date),
			datasets: [
				{
					xAxisID: 'x',
					yAxisID: 'y',
					tension: 0.5,
					pointRadius: 0,
					borderWidth: 2,
					borderColor: '#d4d4d4',
					data: forecast.map((item) => item.temperature.value),
				},
			],
		} as ChartData;
	}

	private getChartOptions(forecast: Forecast[]) {
		const temperatures = forecast.map((item) => item.temperature.value!);
		return {
			responsive: true,
			maintainAspectRatio: false,
			layout: { padding: 0 },
			plugins: {
				legend: { display: false },
				tooltip: {
					displayColors: false,
					callbacks: {
						label: this.getTooltipLabel(forecast),
						title: this.getTooltipTitle(),
					},
				},
			},
			interaction: { mode: 'index', intersect: false },
			scales: {
				x: {
					border: { display: false },
					backgroundColor: 'transparent',
					position: 'top',
					grid: { color: '#525252' },
					ticks: {
						color: '#d4d4d4',
						callback: this.getXTick(forecast),
					},
				},
				y: {
					display: false,
					beginAtZero: false,
					min: Math.min(...temperatures) - 2,
					max: Math.max(...temperatures) + 2,
					grid: { display: false },
					ticks: { display: false },
				},
			},
		} as ChartOptions;
	}

	private getXTick(forecast: Forecast[]) {
		return (tickValue: number, index: number) => {
			const date = forecast[index].date;
			if (date.getHours() !== 0) return;
			return this.datePipe.transform(date, 'EE');
		};
	}

	private getTooltipLabel(forecast: Forecast[]) {
		return (tooltipItem: TooltipItem<'line'>) => {
			return `${tooltipItem.raw} ${forecast[tooltipItem.dataIndex].temperature.symbol}`;
		};
	}

	private getTooltipTitle() {
		return (tooltipItems: TooltipItem<'line'>[]) => {
			return tooltipItems.map((item) => this.datePipe.transform(item.label, 'short'));
		};
	}
}
