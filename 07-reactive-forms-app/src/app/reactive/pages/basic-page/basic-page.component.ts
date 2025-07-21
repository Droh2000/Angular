import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  /*myForm = new FormGroup({
    // Aqui definimos los campos del formulario y tambien pueden ser formularios anidados donde creariamos otro FormGroup
    // (por eso hay una mejor forma de escribir el codigo), para establecerle el tipo de dato lo inicializamos con algun valor
    name: new FormControl(''), // El FormControl() ya va asociado a lo que es un control de un input, select o demas
    price: new FormControl(0, [], []), // Como segundo y tercer argumento se pasan los validadores, Syncronos y Asyncronos
    inStorage: new FormControl(0),
    // Si tubieramos campos que dependan de varios subcampos tendriamos que hacerlo asi
    direccion: new FormGroup({
      calle: new FormControl(),
      ...
    })
    // Por eso ya no vamos a continuar con esta forma de crear formularios reactivos y mejor vamos a usar el FormBuilder
    // para poder crear mejor este tipo de grupos
  });*/

  // El formbuilder es un servicio que esta proveido en el ReactivFormsModule
  private fb = inject(FormBuilder);

  // Nos creamos el formulario
  // La mayor parte de las veses lo vamos a hacer con grupos, dentro definimos el form como si fuera un objeto litral de JS
  myForm = this.fb.group({
    // El primer valor que vamos a tener en el arreglo debe ser el valor que el campo debe de tener (En este caso un String vacio)
    // El segundo elemento son validaroes Syncronos
    // El Tercero serian validadores Asyncronos (Los dos se colocan dentro de un [])
    // Entre los validadores tipicos es indicar que el campo debe ser requirido
    // Con esto al escribir en el HTML veremos que en pantalla cambia el "Valid" en true, esto significa que el 0 es un valor considerado valido
    // si borramos el 0 se nos cambia a False el Valid
    // Asi que debemos de agregar mas validaciones que no pueden ser 0 ni negativo los valores
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });



}
