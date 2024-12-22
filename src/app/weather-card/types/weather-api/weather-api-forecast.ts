import {
  WeatherApi,
  WeatherApiCity,
  WeatherApiClouds,
  WeatherApiCords,
  WeatherApiMain,
  WeatherApiRain,
  WeatherApiWind,
} from './weather-api';

export type WeatherApiForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherApiForecastList[];
  city: WeatherApiForecastCity;
};

export type WeatherApiForecastList = {
  dt: number;
  main: WeatherApiMain;
  weather: WeatherApi[];
  clouds: WeatherApiClouds;
  wind: WeatherApiWind;
  visibility?: number;
  pop: number;
  rain?: WeatherApiRain;
  sys: WeatherApiForecastSys;
  dt_txt: string;
};

export type WeatherApiForecastSys = {
  pod: string;
};

export type WeatherApiForecastCity = WeatherApiCity & {
  name: string;
  coord: WeatherApiCords;
  population: number;
  timezone: number;
};
