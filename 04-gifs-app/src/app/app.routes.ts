import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // Si especificamos la propiedad de "component:" esto hace que el elemento se carge normal sin carga perezosa
    // y va a ser parte del boundle principal de la aplicacion, pero si queremos que solo sea cargado bajo demanda hasta
    // que el usuario entre a este componente entonces usamos "loadComponent", la funcion que recibe seri el Lazy Load del componente
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
      //.then(c => c.DashboardPageComponent) -> Esto es una forma de usarlo pero para evitar la promesa agregamos la palabra DEFAULT en la clase del componente

    // Rutas Hijas
    // Hacer que las nuevas rutas salgan dentro de la ruta padre, Ahora seria: Ruta_Padre/Ruta_Hija
    children: [
      // Si al crear las rutas con sus componentes y usarlas nos manda a la pagina de "dashboard" tenemos que cerrar y volver a ejecutar la aplicacion
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component'),
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  // Cualquier otra ruta que no sea de las definidas arriba manda al usuario al Dashboard
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
