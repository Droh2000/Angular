import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const authRoutes: Routes = [
  {
    path: '', // Esta es otra estrategia para definir rutas por eso ponemos el path vacio
    children: [
      {
        path: 'sign-up', // Nombre de la subruta
        component: RegisterPageComponent // Componente que se va a mostrar
      },
      {
        path: '**',
        redirectTo: 'sign-up' // Para que muestre el contenido
      }
    ]
  }
]

export default authRoutes;
