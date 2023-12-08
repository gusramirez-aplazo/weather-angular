import { Component } from '@angular/core';
import { CityFormComponent } from '../city-form/city-form.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CityFormComponent],
  template: `
    <h1 class="text-lg font-medium ">Search by city</h1>
    <app-city-form (cityEvent)="changeCity($event)" />
  `,
})
export class HomeComponent {
  changeCity(city: string) {
    console.log(city);
  }
}
