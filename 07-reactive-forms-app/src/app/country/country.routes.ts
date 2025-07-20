import { Routes } from '@angular/router';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [
  {
    // Aqui la ruta inmediatamente nos la va a dar el sistema de rutas padre
    path: '',
    component: CountryPageComponent,
  }
]
