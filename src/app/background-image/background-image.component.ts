import { Component, inject } from '@angular/core';
import { ImageService } from '../services/image/image.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-background-image',
  imports: [AsyncPipe],
  templateUrl: './background-image.component.html',
  styleUrl: './background-image.component.scss',
})
export class BackgroundImageComponent {
  private imageService = inject(ImageService);
  imageUrl$ = this.imageService
    .random({ query: '' })
    .pipe(map((image) => image.urls.regular));
}
