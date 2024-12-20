import { Component, computed, inject, signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-current-weather',
  imports: [],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  private weatherService = inject(WeatherService);
  weather = this.weatherService.current;

  tempModes = computed(() =>
    [
      { label: 'ºC', key: 'celsius' },
      { label: 'ºF', key: 'fahrenheit' },
    ].sort((a, b) => {
      const currentTempMode = this.currentTempMode();
      if (a.key === currentTempMode) return -1;
      if (b.key === currentTempMode) return 1;
      return 0;
    })
  );
  currentTempMode = signal<'celsius' | 'fahrenheit'>('celsius');
}
