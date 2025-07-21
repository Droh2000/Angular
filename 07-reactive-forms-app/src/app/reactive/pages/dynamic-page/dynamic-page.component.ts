import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [ JsonPipe,ReactiveFormsModule ],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);

  // Creamos el formulario
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    // Esto tiene que ser un FormArray, porque conforme escribamos podemos agregar elementos en el campo
    // El [] que le pasamos es el valor inicial que queremos que tenga
    favoriteGames: this.fb.array([
      // La razon de especificarle datos es para decir que el minimo debe ser esa cantidad de datos
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ],
      // Aqui colocariamos validaciones al arreglo, no a los campos
      Validators.minLength(3), // Por lo menos debe de haber 3 datos
    ),
  });

  // Invocar la propertie de "favoriteGame" y poder mostrarla en el HTML
  get favoriteGames() {
    // Con la funcion get de myForm podemos buscar y le decimos que sera un array
    return this.myForm.get('favoriteGamse') as FormArray;
  }

}
