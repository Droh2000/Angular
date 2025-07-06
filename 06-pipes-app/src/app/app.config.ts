import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
// Tomamos los idiomas que nos interesa para despues hacer que el usario cambie segun lo que quiera
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import { LocaleService } from './services/locale.service';

// Tenemos que registrar el LOCAL (Lo que se usa como referencia para inyectar el idioma que queremos)
registerLocaleData(localeEs, 'es');
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Aqui definimos que tipo de idioma es el que la aplicacion va a seguir
    {
      provide: LOCALE_ID,
      //useValue:  'es', // Este es el valor que se inyectara cuando se usa el LocalID
      // Hacer el cambio de idioma de manera dinamica con este propiedad hacemos la inyeccion del servicio
      deps: [LocaleService],
      useFactory: (localService: LocaleService) => localService.getLocale,// Esta es la funcion que queremos disparar cuando el proveedor se este inicializando
    }
  ]
};
