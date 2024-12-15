import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RandomImageRequest, RandomImageResponse } from './types/random-image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private http = inject(HttpClient);

  random(req: RandomImageRequest) {
    return this.http.get<RandomImageResponse>('json/images/rain.json');
  }
}
