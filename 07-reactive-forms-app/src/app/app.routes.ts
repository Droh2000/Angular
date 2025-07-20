import { Routes } from '@angular/router';

export const routes: Routes = [
  // Aqui vamos a tener todas las rutas que la aplicacion va a tener
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then(
      // Como en el "reactive.routes" no estamos usando una exportacion por defecto asi que colocamos el then
      // le pusimos "m" de modulo
      (m) => m.reactiveRoutes
    ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'), // Aqui si tenemos exportacion por defecto
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes').then(
      (m) => m.countryRoutes
    ),
  },
  {
    // Cualquier otro path no reconocido nos mandara a "reactive" que como internamente tiene una ruta padre "path:''"
    // entonces entrara al "children" que al no haber ninguno que coincida con el path vacio, entonces caer en el path vacio
    // por lo que caera en el comodin y nos redireccinara al "basic"
    path: '**',
    redirectTo: 'reactive',
  }
];
