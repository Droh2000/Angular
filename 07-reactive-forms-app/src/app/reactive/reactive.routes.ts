import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basico', // El titulo es opcional
        component: BasicPageComponent // Componente que se va a mostrar
      },
      {
        path: 'dynamic',
        title: 'Dinamicos',
        component: DynamicPageComponent
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPageComponent
      },
      {
        path: '**', // Para cualquier otro path que no sea reconocido
        redirectTo: 'basic'
      }
    ]
  }
]
