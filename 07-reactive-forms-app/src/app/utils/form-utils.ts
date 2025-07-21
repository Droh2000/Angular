// Para cambiar las cosas lo vamos a hacer con una clase normal, pero igual podriamos hacer con un servicio

import { FormGroup } from "@angular/forms";

// No vamos a requerir instancia por eso son metodos estaticos (Si lo usuariamos con instancia, seria bueno usar inyeccion de independencia)
export class FormUtils {

  // Nos creamos esta funcion para simplificar el estar mostrando las validaciones en el Template del HTML
  // Le pasamos para que reciba el formulario, no nos intersa los campos, solo con saber a cual aplicarle
  static isValidField( form: FormGroup, fieldName:string ): boolean | null{
    // Aqui obtenemos el nombre del campo que tengamos en el formulario
    // gracias al tipado del "myForm" tenemos el autocompletado
    // El error del formulario
    // no debe salir asi nomas, sino hasta que el usuario preciona un cambio y sale de este
    // Queremos que los errores se muestren en el momento que el usuario toquee el campo
    // Asi que preguntamos si el formulario tiene el error y haya sido tocado
    return (form.controls[fieldName].errors && form.controls[fieldName].touched );
  }

  // Este metodo es para mostrar los mensajes del error que se produsca
  static getfieldError( form: FormGroup, fieldName:string ): string | null{
    // Verificamos que exista el campo
    if( !form.controls[fieldName] ) return null;

    // Comprobamos el error que si puede ser nulo entonces que nos regres un objeto vacio
    const errors = form.controls[fieldName].errors ?? {};

    // Recorremos todas las llaves que tiene este objeto de los errores
    for( const key of Object.keys(errors) ){
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minLength':
          return `Minimo de ${ errors['minLength'].requiredLength } caracteres.`;
        case 'min':
          return `Valor minimo de ${ errors['min'].min } caracteres.`;
      }
    }
    return null;
  }

}
