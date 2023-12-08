import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search.component').then(m => m.SearchComponent),
  },
];
