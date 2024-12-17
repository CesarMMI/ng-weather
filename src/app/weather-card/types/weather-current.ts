export type WeatherCurrentRequest = {
  lat: number;
  lon: number;
};

export type WeatherCurrentResponse = {
  coord: WeatherCurrentCoord;
  weather: WeatherCurrentWeather[];
  base: string;
  main: WeatherCurrentMain;
  visibility: number;
  wind: WeatherCurrentWind;
  rain: WeatherCurrentRain;
  clouds: WeatherCurrentClouds;
  dt: Date;
  sys: WeatherCurrentSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export interface WeatherCurrentCoord {
  lon: number;
  lat: number;
}

export interface WeatherCurrentWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherCurrentMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface WeatherCurrentWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WeatherCurrentRain {
  '1h': number;
}

export interface WeatherCurrentClouds {
  all: number;
}

export interface WeatherCurrentSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
