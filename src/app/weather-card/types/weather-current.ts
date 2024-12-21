import {
  Weather,
  WeatherCity,
  WeatherClouds,
  WeatherCords,
  WeatherMain,
  WeatherRain,
  WeatherWind,
} from './weather';

export type WeatherCurrentResponse = {
  coord: WeatherCords;
  weather: Weather[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: WeatherWind;
  rain: WeatherRain;
  clouds: WeatherClouds;
  dt: Date;
  sys: WeatherCurrentSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type WeatherCurrentSys = WeatherCity & {
  type: number;
};
