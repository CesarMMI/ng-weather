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
	private locationService = inject(LocationService);

	locationName = this.locationService.locationName;

	onKeyDown(event: KeyboardEvent, inputValue: string) {
		if (event.key !== 'Enter' || !inputValue) return;
		this.searchLocation(inputValue);
	}

	requestBrowserLocation() {
		this.locationService.setNavigatorGeolocation();
	}

	searchLocation(inputValue: string) {
		this.locationService.searchLocation(inputValue);
	}
}
