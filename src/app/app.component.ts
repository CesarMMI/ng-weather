import { Component } from '@angular/core';
import { BackgroundImageComponent } from './features/background-image/components/background-image.component';
import { WeatherCardComponent } from './features/weather-card/components/weather-card/weather-card.component';

@Component({
  selector: 'app-root',
  imports: [BackgroundImageComponent, WeatherCardComponent],
  template: `
    <app-background-image />
    <app-weather-card />
  `,
})
export class AppComponent {}
