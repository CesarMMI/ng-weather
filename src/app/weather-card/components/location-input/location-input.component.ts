import { Component, computed, inject } from '@angular/core';
import { IconButtonDirective } from '../../../shared/directives/icon-button.directive';
import { LocationService } from '../../services/location.service';

@Component({
	selector: 'app-location-input',
	imports: [IconButtonDirective],
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
