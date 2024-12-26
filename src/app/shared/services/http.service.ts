import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export abstract class HttpService {
	private http = inject(HttpClient);

	protected abstract url: string;
	protected abstract urlDebug: string;

	constructor() {}

	protected get<T>(endpoint: string, params: { [prop: string]: any }) {
		let url = this.url + endpoint;
		if (environment.debug) url = this.urlDebug + endpoint + '.json';
		return this.http.get<T>(url, { params });
	}
}
