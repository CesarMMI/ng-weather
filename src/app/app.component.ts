import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WeatherService } from './services/weather/weather.service';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { WeatherCardComponent } from "./weather-card/weather-card.component";

@Component({
  selector: 'app-root',
  imports: [BackgroundImageComponent, WeatherCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
