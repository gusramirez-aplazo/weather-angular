import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Coordinates } from '../domain/coordinates';
import { Place } from '../domain/place';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  readonly #http = inject(HttpClient);
  readonly #reservamosBaseApi1Url = 'https://search.reservamos.mx/api';
  readonly #placesEndpoint = '/v2/places';
  readonly #cityFilter = 'city';

  getByCity(city: string): Observable<(Coordinates & { city: string }) | null> {
    return this.#http
      .get<Place[]>(`${this.#reservamosBaseApi1Url}${this.#placesEndpoint}`, {
        params: {
          q: city,
        },
      })
      .pipe(
        map(response =>
          response.find(place => place.result_type === this.#cityFilter)
        ),
        map(place => {
          if (!place) {
            return null;
          }

          return {
            lat: parseFloat(place.lat),
            long: parseFloat(place.long),
            city: place.city_name,
            state: place.state,
            country: place.country,
          };
        })
      );
  }
}
