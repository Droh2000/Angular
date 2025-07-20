import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string,
  route: string
}

// Como tenemos una ruta padre y queremos la primera en la cual tenemos el "path=''"
// y obtenemos el children, si no hay nada mandamos un [] (Esto es para asegurarnos que siempre vamos a tener rutas y no vamos a caer en un undefined)
const reactiveItems = reactiveRoutes[0].children ?? [];


@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
  // Como tenemos un problema del undefined por la parte de reactiveRoutes "path:**"
  .filter((item) => item.path !== '**')
  .map((item) => ({
    route: `reactive/${item.path}`, // Le agregamos el segmento de la ruta porque solo obtenemos el nombre
    title: `${item.title}`, // Lo ponemos asi para que sea de tipo String
  }));

  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: './auth'
  }];

  countryMenu: MenuItem[] = [{
    title: 'Paises',
    route: './country'
  }];
}
