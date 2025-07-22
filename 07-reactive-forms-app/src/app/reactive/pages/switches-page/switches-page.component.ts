import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [ JsonPipe,
             ReactiveFormsModule, // Para asignar referencias al HTML
  ],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  // Aunque lo podemos crear manualmente es mas facil trabajar con el Fontbuilder
  private fb = inject(FormBuilder);

  // Tener acceso a las funciones helpers que hemos creado
  formUtils =  FormUtils;

  // Creamos el formulario con los campos que tiene y validaciones
  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],// El valor por defecto seleccionado es: 'M' y sera obligatorio (Seleccionando uno de los dos que hay)
    wantNotifications: [true], // El valor por defecto sera seleccionado
    termAndConditions: [false, Validators.requiredTrue], // Obligamos que sea seleccionado
  });

  onSubmit(){
    // Repasa todos los campos y si no esta uno correcto nos saldara que tiene errores
    this.myForm.markAllAsTouched();
  }

}
