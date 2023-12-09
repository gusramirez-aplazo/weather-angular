import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { format, formatDistanceToNow, fromUnixTime, min } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ReservamosWeatherResponse,
  WeatherResponse,
  WeatherUI,
} from '../domain/weather';
import { PlacesService } from './places.service';

const config = {
  locale: es,
};

const emptyPlaceResponse: ReservamosWeatherResponse = {
  city: '',
  minDate: '',
  minTime: '',
  dataByDay: {} as Record<string, WeatherUI[]>,
};

@Injectable({ providedIn: 'root' })
export class WeatherService {
  readonly #http = inject(HttpClient);
  readonly #placeService = inject(PlacesService);
  readonly #openWeatherMapBaseApiUrl =
    'https://api.openweathermap.org/data/2.5';
  readonly #weatherEndpoint = '/forecast';
  readonly #apiKey = environment.openWeatherApiKey;
  readonly #units = 'metric';

  getFiveDaysByCity(city: string): Observable<ReservamosWeatherResponse> {
    const lang = 'es';

    return this.#placeService.getByCity(city).pipe(
      switchMap(place => {
        if (!place) {
          return of(emptyPlaceResponse);
        }

        return this.#http
          .get<WeatherResponse>(
            `${this.#openWeatherMapBaseApiUrl}${this.#weatherEndpoint}`,
            {
              params: {
                lat: place.lat.toString(),
                lon: place.long.toString(),
                lang,
                units: this.#units,
                appid: this.#apiKey,
              },
            }
          )
          .pipe(
            map(weatherResponse => {
              const dataByDay: Record<string, WeatherUI[]> = {};

              weatherResponse.list.forEach(detail => {
                const dateFromUnix = fromUnixTime(detail.dt);
                const dayDate = format(dateFromUnix, 'PP', config);

                const item: WeatherUI = {
                  id: detail.dt,
                  humanDistanceDate: formatDistanceToNow(dateFromUnix, config),
                  date: dateFromUnix,
                  dayDate,
                  time: format(dateFromUnix, 'p', config),
                  temperature: detail.main.temp,
                  temperatureMin: detail.main.temp_min,
                  temperatureMax: detail.main.temp_max,
                  temperatureFeelsLike: detail.main.feels_like,
                  iconUrl: `http://openweathermap.org/img/wn/${detail.weather[0].icon}.png`,
                  iconGiantUrl: `http://openweathermap.org/img/wn/${detail.weather[0].icon}@4x.png`,
                  description: detail.weather[0].description,
                };

                if (!dataByDay[dayDate]) {
                  dataByDay[dayDate] = [item];
                } else {
                  dataByDay[dayDate].push(item);
                }
              });

              const minDate = min(
                Object.values(dataByDay).map(dataByDay => dataByDay[0].date)
              );
              const minTime = format(minDate, 'p', config);

              return {
                minDate: format(minDate, 'PP', config),
                minTime,
                city: place.city,
                dataByDay,
              };
            })
          );
      }),

      catchError(err => {
        console.warn(err);

        return of(emptyPlaceResponse);
      })
    );
  }
}
