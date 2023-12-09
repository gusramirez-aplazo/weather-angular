import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="bg-gradient-to-bl from-indigo-800 from-10% via-emerald-50 via-65% to-sky-800 to-90% min-h-screen w-full">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
