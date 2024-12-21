export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf?: number;
};

export type WeatherClouds = {
  all: number;
};

export type WeatherWind = {
  speed: number;
  deg: number;
  gust: number;
};

export type WeatherRain = {
  '1h'?: number;
  '3h'?: number;
};

export type WeatherCords = {
  lat: number;
  lon: number;
};

export type WeatherCity = {
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};
