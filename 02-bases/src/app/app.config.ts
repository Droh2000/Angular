import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Aqui realizamos configuraciones de JS o TS de manera global
export const appConfig: ApplicationConfig = {
  providers: [
    // Esta es una estrategia para la deteccion de cambios de angular, esto puede cambiar de nombre o qdejar de existir
    // En este podemos cambiar como queremos que Angular trabaje en cuanto al manejo de su estado
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // Aqui colocamos las rutas que tengamos definidas en este archivo
    provideRouter(routes)]
};
