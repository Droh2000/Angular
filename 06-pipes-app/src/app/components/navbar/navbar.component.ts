import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  /*
      Consideraciones para cuando saber usar Signal y cuando usar Propiedades
        En este caso no vamos a agregar rutas de manera dinamica (Ya estan definidas en la aplicacion)
        asi que no tiene sentido que sea una Signal porque no va a cambiar de forma dinamica
        entonces nos vamos a crear una propertie para tener acceso a la ruta desde el HTML

      Usamos el objeto de Routes el cual nos da las properties de Title y Path, como por defecto es un Array lo recorremos con un Map
      Asi regresamos un arreglo con solo las properties que nos insteresa
  */
  routes = routes.map( route => ({
    // Regresamos directamente un nuevo objeto, aqui para que no salga undefined le ponemos que siempre nos regres un String
    title: route.title ?? '',
    path: route.path ?? '',
  }));

}
