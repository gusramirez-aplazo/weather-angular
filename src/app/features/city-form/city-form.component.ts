import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-city-form',
  template: `
    <div class="relative w-full max-w-sm mx-auto">
      <button
        aria-hidden="true"
        aria-label="Search icon"
        class="absolute top-0 start-0 flex items-center justify-center w-10 text-sm font-medium h-full rounded-s-lg text-blue-700 bg-gray-50  border-y border-s border-gray-300 pointer-events-none cursor-default">
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
      </button>

      <input
        [formControl]="cityControl"
        type="search"
        id="city"
        class="block py-2.5 px-12 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Busca por ciudad..."
        required />

      @if (hasEraseMarkEnabled$ | async) {
        <button
          (click)="cleanCity()"
          type="button"
          class="absolute top-0 end-0 p-2.5 border-y-2 border-e-2 border-gray-300 font-medium h-full text-gray-900 rounded-e-lg bg-gray-50  hover:bg-blue-200 focus:ring focus:outline-none focus:ring-blue-200">
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
    </div>
  `,
})
export class CityFormComponent implements OnInit, OnDestroy {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #destroy$ = new Subject<void>();

  cityControl = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  hasEraseMarkEnabled$ = this.cityControl.valueChanges.pipe(
    startWith(this.cityControl.value),
    map(value => value.length > 0)
  );

  ngOnInit(): void {
    this.cityControl.valueChanges
      .pipe(
        startWith(this.cityControl.value),
        takeUntil(this.#destroy$),
        distinctUntilChanged(),
        debounceTime(450)
      )
      .subscribe(value => {
        const extras: NavigationExtras = {
          relativeTo: this.#route,
          queryParams: { city: value },
          queryParamsHandling: 'merge',
        };

        this.#router.navigate(['.'], extras);
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  cleanCity(): void {
    this.cityControl.setValue('');
  }
}
