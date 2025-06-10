import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';

export const countryRoutes: Routes = [
  {
    path: '',
    // Deberiamos de mostrar otro tipo de componente que deria de enmarcar como lucen todas las paginas que estan relacionadas en la ruta de Country
    // La ruta que vamos a mostrar por defecto cuando entremos a la ruta de paises es esta
    component: CountryLayoutComponent,

    // Para mostrar las rutas hijas (Estas son las rutas denetro de la carpeta Page)
    children: [
      {
        path: 'by-capital',
        // Podriamos implementar carga perezosa pero suponemos que tan pronto cargue este modulo ya tenga listo este componente
        component: ByCapitalPageComponent
      },

      // Redireccion si no es ninguna de las rutas hijas
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  },
  /*{
    path: 'country',
    // ??? {}
  },*/
];

export default countryRoutes;
