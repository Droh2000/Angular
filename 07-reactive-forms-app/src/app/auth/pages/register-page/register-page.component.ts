import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    email: ['', [Validators.required, Validators.pattern( FormUtils.emailPattern )]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern( FormUtils.notOnlySpacesPattern )]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required],
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
