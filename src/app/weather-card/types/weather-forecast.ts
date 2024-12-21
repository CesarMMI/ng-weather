import {
  Weather,
  WeatherCity,
  WeatherClouds,
  WeatherCords,
  WeatherMain,
  WeatherRain,
  WeatherWind,
} from './weather';

export type WeatherForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastList[];
  city: WeatherForecastCity;
};

export type WeatherForecastList = {
  dt: number;
  main: WeatherMain;
  weather: Weather[];
  clouds: WeatherClouds;
  wind: WeatherWind;
  visibility?: number;
  pop: number;
  rain?: WeatherRain;
  sys: WeatherForecastSys;
  dt_txt: string;
};

export type WeatherForecastSys = {
  pod: string;
};

export type WeatherForecastCity = WeatherCity & {
  name: string;
  coord: WeatherCords;
  population: number;
  timezone: number;
};
