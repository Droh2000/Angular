import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar', // Esto nos permite poder usarlo en otros componentes
  imports: [
    // Lo importamos para poder usar el enrutamiento (Esta es nuestra primera directiva que sirven para cambiar 
    // el funcionamiento de algo) en este caso lo que queremos hacer es que los <a></a> conoscan la directiva
    // del routerLink (Es donde le pasamos el enlace)
    RouterLink,
    
    // Esta directiva es para saber a cual de las opciones del menu tenemos seleccianada
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

}
