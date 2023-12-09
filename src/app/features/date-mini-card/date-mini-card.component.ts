import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { WeatherUI } from '../../core/domain/weather';

@Component({
  standalone: true,
  selector: 'app-date-mini-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgClass],
  template: `
    <button
      class="w-full h-full border border-gray-200 rounded-lg shadow p-5"
      [ngClass]="{
        'bg-blue-100 scale-105': isSelected,
        'bg-white': !isSelected
      }">
      <div class="flex flex-col items-center gap-y-2 w-full justify-stretch">
        <img
          class="mb-3 rounded-full drop-shadow-lg"
          [src]="weather.iconUrl"
          alt="weather icon" />
        <h3 class="mb-1 text-lg font-medium text-gray-900 tabular-nums">
          {{ weather.temperature }} &deg;C
        </h3>
        <span class="text-xs">
          {{ weather.description }}
        </span>
        <section class="flex w-full justify-end">
          <span class="text-xs text-gray-500 text-right">
            en {{ weather.humanDistanceDate }}
          </span>
        </section>
      </div>
    </button>
  `,
})
export class DateMiniCardComponent {
  @Input({ required: true })
  weather!: WeatherUI;

  @Input()
  isSelected = false;
}
