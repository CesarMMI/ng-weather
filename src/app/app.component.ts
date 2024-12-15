import { Component } from '@angular/core';
import { BackgroundImageComponent } from './background-image/components/background-image/background-image.component';
import { WeatherCardComponent } from './weather-card/components/weather-card/weather-card.component';

@Component({
  selector: 'app-root',
  imports: [BackgroundImageComponent, WeatherCardComponent],
  template: `
    <app-background-image />
    <app-weather-card />
  `,
})
export class AppComponent {}
