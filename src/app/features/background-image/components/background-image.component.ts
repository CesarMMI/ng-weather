import { Component, inject } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
	selector: 'app-background-image',
	imports: [],
	template: `
		@if (imageUrl(); as imageUrl) {
		<div
			class="opacity-50 h-screen w-screen bg-cover bg-center absolute z-[-1]"
			[style.backgroundImage]="'url(' + imageUrl + ')'"
		></div>
		}
	`,
})
export class BackgroundImageComponent {
	private imageService = inject(ImageService);
	imageUrl = this.imageService.imageUrl;
}
