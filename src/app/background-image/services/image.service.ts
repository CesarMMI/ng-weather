import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { RandomImageRequest, RandomImageResponse } from '../types/random-image';

@Injectable({
	providedIn: 'root',
})
export class ImageService extends HttpService {
	private client_id = environment.imagesApiKey;
	protected override url = environment.imagesApiUrl;
	protected override urlDebug = environment.imagesApiUrlDebug;

	random(req: RandomImageRequest) {
		return this.get<RandomImageResponse>('photos/random', { client_id: this.client_id, query: req.query });
	}
}
