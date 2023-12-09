import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { WeatherUI } from '../../core/domain/weather';
import { WeatherService } from '../../core/services/weather.service';
import { CityFormComponent } from '../city-form/city-form.component';
import { DateMiniCardComponent } from '../date-mini-card/date-mini-card.component';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CityFormComponent, DateMiniCardComponent],
  template: `
    <div class="max-w-md mx-auto pt-4 pb-16 md:pt-8">
      <h1 class="text-xl text-center font-medium text-white drop-shadow-md">
        Pronóstico del clima
      </h1>

      <article class="my-8 px-3 sm:px-4 mx-auto">
        <app-city-form />
      </article>

      @defer (when nextDays()) {
        @if (nextDays().length === 0) {
          <div class="w-full flex justify-center">
            <p class="text-center text-gray-900">No se encontró la ciudad</p>
          </div>
        } @else {
          <article class="flex flex-col w-full gap-6 items-center">
            <img
              class="mb-3 rounded-full drop-shadow-lg"
              [src]="currentIcon()"
              alt="weather icon" />
            <p class="-mt-16 text-right self-end">
              {{ currentDay() }}
            </p>
            <h2 class="text-4xl font-medium">{{ currentTemp() }} &deg;C</h2>
            <h2 class="text-xl">{{ currentCity() }}</h2>

            <p class="text-lg">{{ currentDescription() }}</p>

            <div class="flex w-full justify-around items-center">
              <span class="tabular-nums mx-2">
                Temp min: {{ currentMinTemp() }} &deg;C
              </span>
              <span class="tabular-nums mx-2">
                Temp max: {{ currentMaxTemp() }} &deg;C
              </span>
            </div>
          </article>

          <h3 class="text-lg text-gray-950 mt-8 mb-4">Próximos días</h3>
          <div class="w-full overflow-auto">
            <div
              class="w-full grid items-stretch grid-cols-5-min125 h-full gap-x-4 gap-y-6 px-4 sm:px-6 py-4">
              @for (item of nextDays(); track item.id; let i = $index) {
                <app-date-mini-card
                  [weather]="item"
                  [isSelected]="i === selectedIndex()"
                  (click)="changeDay(i)" />
              }
            </div>
          </div>
        }
      } @loading (after 0ms; minimum 1s) {
        <div class="w-full flex justify-center">
          <div
            class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }
    </div>
  `,
})
export class SearchComponent implements OnDestroy {
  readonly #route = inject(ActivatedRoute);
  readonly #weatherService = inject(WeatherService);

  readonly #destroy$ = new Subject<void>();

  readonly #weather$ = this.#route.queryParamMap.pipe(
    takeUntil(this.#destroy$),
    switchMap(params =>
      this.#weatherService.getFiveDaysByCity(params.get('city') ?? '')
    )
  );
  readonly #weather = toSignal(this.#weather$);
  readonly #dayFromIndex = signal(0);

  readonly selectedIndex = computed(() => this.#dayFromIndex());

  nextDays = computed(() =>
    this.#weather()
      ? Object.values(this.#weather()?.dataByDay as Record<string, WeatherUI[]>)
          .map(data =>
            data.filter(item => item.time === this.#weather()?.minTime)
          )
          .flat()
      : []
  );
  currentItem = computed(() => this.nextDays()[this.#dayFromIndex()] ?? null);
  currentDay = computed(() => this.currentItem()?.dayDate ?? '');
  currentTemp = computed(() => this.currentItem()?.temperature ?? 0);
  currentCity = computed(() => this.#weather()?.city ?? '');
  currentDescription = computed(() => this.currentItem()?.description ?? '');
  currentMaxTemp = computed(() => this.currentItem()?.temperatureMax ?? 0);
  currentMinTemp = computed(() => this.currentItem()?.temperatureMin ?? 0);
  currentIcon = computed(() => this.currentItem()?.iconGiantUrl ?? '');

  changeDay(index: number): void {
    this.#dayFromIndex.set(index);
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
