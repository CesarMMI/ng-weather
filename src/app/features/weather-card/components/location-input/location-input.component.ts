import { Component, inject } from '@angular/core';
import { IconButtonDirective } from '../../../../shared/directives/icon-button.directive';
import { LocationService } from '../../services/location.service';

@Component({
	selector: 'app-location-input',
	imports: [IconButtonDirective],
	template: `
		<div class="flex items-center gap-4">
			<input
				#input
				type="text"
				name="location"
				id="location"
				class="flex-1 px-2 text-lg outline-none bg-transparent text-neutral-50 border-b border-neutral-500 focus:border-neutral-300 transition-colors"
				[value]="locationName()"
				(keydown)="onKeyDown($event, input.value)"
			/>
			<button appIconButton (click)="searchLocation(input.value)">search</button>
			<button appIconButton (click)="requestBrowserLocation()">my_location</button>
		</div>
	`,
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
