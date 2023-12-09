export interface ReservamosWeatherResponse {
  city: string;
  minDate: string;
  minTime: string;
  dataByDay: Record<string, WeatherUI[]>;
}

export interface WeatherUI {
  id: number;
  humanDistanceDate: string;
  time: string;
  date: Date;
  dayDate: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  temperatureFeelsLike: number;
  iconUrl: string;
  iconGiantUrl: string;
  description: string;
}

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Detail[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface Detail {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface Clouds {
  all: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: string;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
