import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    // Deberiamos de mostrar otro tipo de componente que deria de enmarcar como lucen todas las paginas que estan relacionadas en la ruta de Country
    component: ByCapitalPageComponent,
  },
  /*{
    path: 'country',
    // ??? {}
  },*/
  /*{
    path: '**',
    redirectTo: ''
  }*/
];

export default countryRoutes;
