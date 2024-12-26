import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeBr from '@angular/common/locales/pt';
import {
	ApplicationConfig,
	LOCALE_ID,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';

registerLocaleData(localeBr, 'pt');
export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
		provideCharts(withDefaultRegisterables()),
		{ provide: LOCALE_ID, useValue: 'pt' },
	],
};
