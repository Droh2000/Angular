import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [ JsonPipe,ReactiveFormsModule ],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  // Creamos el formulario
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    // Esto tiene que ser un FormArray, porque conforme escribamos podemos agregar elementos en el campo
    // El [] que le pasamos es el valor inicial que queremos que tenga
    // Tenemo que mostrar el error que le indique al usuario que le falta agregar mas elementos a la lista
    // para que el formulario sea correcto, esto esta al nivel del campo "favoriteGames"
    favoriteGames: this.fb.array([
      // La razon de especificarle datos es para decir que el minimo debe ser esa cantidad de datos
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ],
      // Aqui colocariamos validaciones al arreglo, no a los campos
      Validators.minLength(3), // Por lo menos debe de haber 3 datos
    ),
  });

  // Agregarle funcionalidad al boton para agregar mas elementos en campos editables a la lista de favoritas
  // veririficando que no se puedan agregar strings vacios u otra data no permitida
  // Como tenemos un formulario vamos a crearnos un control de manera aislada
  newFavorite = new FormControl('', Validators.required);
  // newFavorite = this.fb.control([]) -> Cualquiera de las dos formas sale la misma

  // Invocar la propertie de "favoriteGame" y poder mostrarla en el HTML
  get favoriteGames() {
    // Con la funcion get de myForm podemos buscar y le decimos que sera un array
    return this.myForm.get('favoriteGamse') as FormArray;
  }

  onAddToFavorites(){
    // Si no es valido el contenido que nos mandan, se sale y no hace nada
    if( this.newFavorite.invalid ) return;

    // Tomamos el valor de la caja de texto
    const newGame = this.newFavorite.value;

    // Tenemos que insertarlo en el arreglo "FavoriteGames"
    this.favoriteGames.push(this.fb.control( newGame, Validators.required ));

    // Limpiamos la caja de texto despues de ser insertado
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number){
    // Borramos el elemento del arreglo
    this.favoriteGames.removeAt(index);
  }

  // Esto va a hacer que cuando hagamos el posteo del formulario entonces toque todos los campos para verificar que sean validos
  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
