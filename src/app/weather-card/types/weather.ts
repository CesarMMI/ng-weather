import { Temperature } from './temperature';

export type Weather = {
	clouds: number;
	humidity: number;
	temperature: Temperature;
	wind: number;
};
