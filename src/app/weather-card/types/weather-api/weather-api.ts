export type WeatherApi = {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  
  export type WeatherApiMain = {
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
  
  export type WeatherApiClouds = {
    all: number;
  };
  
  export type WeatherApiWind = {
    speed: number;
    deg: number;
    gust: number;
  };
  
  export type WeatherApiRain = {
    '1h'?: number;
    '3h'?: number;
  };
  
  export type WeatherApiCords = {
    lat: number;
    lon: number;
  };
  
  export type WeatherApiCity = {
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  