import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';

// En este archivo de rutas vamos a empezar a definir cada una de forma que se nos muestra
// el componente asignado como: "Nombre_Ruta" => Componente
export const routes: Routes = [
    // Aqui definimos las rutas
    {
        // Ruta que le damos a la aplicacion para que muestre nuestro component
        // Si no definimos nada esto es la pagina inicial
        path: '',
        component: CounterPageComponent,
        
    }
];
