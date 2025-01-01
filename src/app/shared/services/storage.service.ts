import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	get<T>(key: string) {
		try {
			const strValue = localStorage.getItem(key);
			if (!strValue) return undefined;
			return JSON.parse(strValue) as T;
		} catch (e) {
			return undefined;
		}
	}
	save(key: string, value: unknown) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}
