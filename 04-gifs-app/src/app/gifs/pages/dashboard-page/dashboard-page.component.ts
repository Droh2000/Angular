// Este archivo lo creamos haciendo click derecho en la carpeta Pages y seleccionando la opcion de Angular Schematics Generate File
// Este seria nunestro Primer Componente
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GifsSideMenuComponent],
  templateUrl: './dashboard-page.component.html',
  // Angular ya por defecto con esta propiedad en True, con esto nuestros componentes son modulos, porque las importaciones de arriban
  // hacen que el componente sepa cuales son los objetos que nesecita para construirse y poder trabajar
  //  standalone: true
})
export default class DashboardPageComponent { }
