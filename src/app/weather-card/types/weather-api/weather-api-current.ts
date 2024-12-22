import {
    WeatherApi,
    WeatherApiCity,
    WeatherApiClouds,
    WeatherApiCords,
    WeatherApiMain,
    WeatherApiRain,
    WeatherApiWind,
} from './weather-api';

export type WeatherApiCurrentResponse = {
	coord: WeatherApiCords;
	weather: WeatherApi[];
	base: string;
	main: WeatherApiMain;
	visibility: number;
	wind: WeatherApiWind;
	rain: WeatherApiRain;
	clouds: WeatherApiClouds;
	dt: Date;
	sys: WeatherApiCurrentSys;
	timezone: number;
	id: number;
	name: string;
	cod: number;
};

export type WeatherApiCurrentSys = WeatherApiCity & {
	type: number;
};
