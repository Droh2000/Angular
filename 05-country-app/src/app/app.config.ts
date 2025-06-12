import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Aqui es donde proveemos el objeto del HttpClient y le pasamos
    // el Fetch() para que use la interpretacion nativa del FetchApi
    provideHttpClient(withFetch())
  ]
};
