import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    // Este nos permite tener control de todo lo que son los formularios reactivos
    // Aqui vemos la palabra "Module" -> esto en angular es como un paquete que tiene dentro los Paths, directivas, Controles, componentes, servicios
    // asi el formulario es parte de este paquete que seria como un agrupador
    ReactiveFormsModule,
  ],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // La idea de los formularios reactivos es que del lado de TS tengamos el control del formulario
  // ya lo vamos a empezar a conectar, hasta el momento estamos creando referencias locales como "#txtName"
  // esto funciona sin problema pero cuando ya tenemos mas de un campo ya es recomendable tener un formulario reactivo
  // Aunque igual si tenemos un solo campo con validaciones, ya es recomendable tener formulario reactivos

  // Para los formularios reactivos nos creamos una propiedad que contiene el como luce la apariencia de ese formulario
  // y esto incluye las validaciones
  // Primero lo vamos a hacer de forma tradicional
  myForm = new FormGroup({
    // Aqui definimos los campos del formulario y tambien pueden ser formularios anidados donde creariamos otro FormGroup
    // (por eso hay una mejor forma de escribir el codigo), para establecerle el tipo de dato lo inicializamos con algun valor
    name: new FormControl(''), // El FormControl() ya va asociado a lo que es un control de un input, select o demas
    price: new FormControl(0),
    inStorage: new FormControl(0),
  });

}
