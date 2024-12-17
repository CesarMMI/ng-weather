import { Component, computed, inject } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { IconDirective } from '../../../shared/directives/icon.directive';

@Component({
  selector: 'app-location-input',
  imports: [IconDirective],
  templateUrl: './location-input.component.html',
  styleUrl: './location-input.component.scss',
})
export class LocationInputComponent {
  private geolocationService = inject(LocationService);

  location = computed(() => {
    const geolocation = this.geolocationService.location();
    if (!geolocation) return;
    return `${geolocation?.name} / ${geolocation?.country}`;
  });
}
