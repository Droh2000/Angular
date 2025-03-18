import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    provideRouter(routes),

    // Esta configuracion es para lo sitios donde tenemos que implementar el HashStrategy
    // El cual es usado en los SPA
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    // Despues de implementar esto en nuestra aplicacion veremos que la URL cambio y nos pone un #
    // ese es como un indicador que evita que el navegador redireccione a esa carpeta, siempre estamos en el ROOT
    // Asi: ROOT/#/pagina
    // Despues de esta modificacion volvemos a ejectuar el comando: ng build
  ],
};
