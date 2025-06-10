import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  // En este punto tenemos dos rutas, las que estan relacionadas a paises (Country) y la ruta de (Home-Page)
  // queremos que la ruta del Home siempre este disponible para los usuarios
  {
    path: '',
    component: HomePageComponent, // No le hacemos Lazyload porque damos por hecho que cualquier persona que entre a esta App podra acceder
  },
  {
    path: 'country',
    // Lee el archivo de rutas que tenemos para el modulo especifico de country que como lo tenemos exportado por defecto toma la ruta
    loadChildren: () => import('./country/country.routes'),
  },
  // Cualquier otra ruta caera en la ruta de HomePage
  {
    path: '**',
    redirectTo: ''
  }
];
