import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // Si verificamos aqui, veremos que al tener el "provideZoneChangeDetection" solamente se esta usando Zoonless en esta aplicacion y no ZoneJS
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
