import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, map, startWith } from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-city-form',
  template: `
    <form [formGroup]="cityForm" (ngSubmit)="changeCity()">
      <div class="relative w-full max-w-sm">
        <input
          formControlName="city"
          type="search"
          id="city"
          class="block p-2.5 pe-20 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search weather by city..."
          required />

        @if (hasEraseMarkEnabled$ | async) {
          <button
            (click)="cleanCity()"
            type="button"
            class="absolute top-0 end-10 p-2.5 border-y-2 border-gray-300 font-medium h-full text-gray-900 bg-gray-50  hover:bg-blue-200 focus:ring focus:outline-none focus:ring-blue-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        }

        <button
          type="submit"
          class="absolute top-0 end-0 flex items-center justify-center w-10 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </form>
  `,
})
export class CityFormComponent {
  @Output()
  cityEvent = new BehaviorSubject<string>('');

  cityControl = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  cityForm = new FormGroup({
    city: this.cityControl,
  });

  hasEraseMarkEnabled$ = this.cityControl.valueChanges.pipe(
    startWith(this.cityControl.value),
    map(value => value.length > 0)
  );

  changeCity(): void {
    this.cityEvent.next(this.cityControl.value);
  }

  cleanCity(): void {
    this.cityControl.setValue('');
    this.changeCity();
  }
}
