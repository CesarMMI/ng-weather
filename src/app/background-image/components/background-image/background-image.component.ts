import { Component, inject } from '@angular/core';
import { ImageService } from './../../services/image.service';

@Component({
	selector: 'app-background-image',
	imports: [],
	templateUrl: './background-image.component.html',
	styleUrl: './background-image.component.scss',
})
export class BackgroundImageComponent {
	private imageService = inject(ImageService);
	imageUrl = this.imageService.imageUrl;
}
