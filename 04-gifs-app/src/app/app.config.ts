import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // En angular requerimos definir como queremos que trabaje que el "HttpClient" (Dar ese servicion de manera global) porque en "gifs.service" lo estamos inyectando
    // pero de donde viene? Donde esta la instancia?, por eso nos vamos aqui, si dejamos solo entre parentesis sin nada, Angular usara las peticion XHR que eran las antiguas
    // para trabajar con el nuevo estandar le especificamos "withFetch()"
    provideHttpClient(withFetch()), // Aqui proveemos el Cliente y en el archivo "gifs.services.ts" lo inyectamos
  ]
};
