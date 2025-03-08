import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Aqui le decimos a angular como queremos que corra la aplicacion
// Este es el punto de entrada de nuestra aplicacion de angular y se genera nuestra App
// El componente Raiz es el "AppComponente", en el "appConfig" vamos a poder cambiar como corre
// la aplicacion
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
