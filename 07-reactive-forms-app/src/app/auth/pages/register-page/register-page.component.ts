import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [ JsonPipe, ReactiveFormsModule ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);

  formUtils =  FormUtils; // Para mostrar los errroes en el formulario

  // Creamos la referencia a nuestro formulario con los campos y validaciones (Estas son Syncronas)
  // Usamos las expresiones regulares para que se aplique en las validaciones y no usar las de angular
  myForm = this.fb.group({
    name: ['', Validators.required, Validators.pattern( FormUtils.namePattern )],
    // El tercer argumento es para las validaciones asyncronas
    // Los errores Sincronos tienen prioridad y no se van a ejecutar los asyncronos hasya que no se resulevan los sincronos
    email: ['', [Validators.required, Validators.pattern( FormUtils.emailPattern )], FormUtils.checkingServerResponse],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern( FormUtils.notOnlySpacesPattern ), FormUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required],
  },
  // Para agregar la validacion de que las dos contraseñas ingresadas coincidas
  // lo vamos a hacer a nivel del formulario "this.fb.group" y no una validacion a nivel de campo
  {
    // Aqui colocamos las validaciones personalizadas
    validators: [
      FormUtils.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
