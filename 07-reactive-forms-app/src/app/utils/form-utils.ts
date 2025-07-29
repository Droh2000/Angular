// Para cambiar las cosas lo vamos a hacer con una clase normal, pero igual podriamos hacer con un servicio

import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

// Esta funcion nos va a hacer esperarnos 2 segundos y medio para despues seguir la ejecucion
// que simulara el proceso de llegar al backend y recibir la respuesta
async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

// No vamos a requerir instancia por eso son metodos estaticos (Si lo usuariamos con instancia, seria bueno usar inyeccion de independencia)
export class FormUtils {
  // Expresiones regulares para aplicarlas como validaciones en los formularios
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
    return FormUtils.getTextErros(errors);
  }

  // Para agregar las validaciones a los campos dinamicos que estan dentro del FOR
  // requerimos saber la poscion indice del elemento dentro del arreglo
  static isValidFieldInArray( formArray: FormArray, index: number ){
    return (
      // Si hay errores y a sido tocado el formulario
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  // Para mostrar los errores en los campos dinamicos que estan dentro de un bucle For
  static getfieldErrorInArray( formArray: FormArray, index:number ): string | null{
    if( formArray.controls.length === 0 ) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextErros(errors);;
  }

  static getTextErros(errors: ValidationErrors){
    for( const key of Object.keys(errors) ){
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minLength':
          return `Minimo de ${ errors['minLength'].requiredLength } caracteres.`;
        case 'min':
          return `Valor minimo de ${ errors['min'].min } caracteres.`;
        // Agregamos la validacion que sea de tipo Email
        case 'email':
          return `El Valor no es un correo electronico.`;
        case 'emailTaken':
          return `El correo electronico ya esta siendo usado por otro usuario`;
        // Mostrar el error de la expreccion con el Email
        case 'pattern':
          if( errors['pattern'].requiredPattern === FormUtils.emailPattern ){
            return 'El valor ingresado no luce como un correo electronico';
          }
          return 'Error del patron por la expreccion regular';
        case 'noStrider':
          return `El nombre de usuario Stride no esta permitido`;
        default:
          return `Error de validacion no implementado ${ key }`;// Si no esta y se comete un error en el formulario no veremos nada pero con esto ya sabemos porque no sale el mensaje
      }
    }

    return null;
  }

  // Comparar que el contenido de los campos del password sean iguales
  static isFieldOneEqualFieldTwo( field1: string, field2: string ){
    // Tenemos que regresar una funcion que regrese un objeto como se muestran en la pagina: { "Nombre_error": { Descripcion del error } }
    // Con este argumento obtenemos el formulario
    return ( formGroup: AbstractControl ) => {
      // Si no hay ningun error debemos de regresar Null sino el objeto
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    }
  }

  // Creacion de validacion personalizado con la validacion asyncrona
  // El tipo de dato del argumento es el que requerimos para crearnos la validacion personalizada
  static async checkingServerResponse(control: AbstractControl): Promise< ValidationErrors | null >{
    // Tenemos que regresar null si no hay ningun error o regresar el objeto con el error
    await sleep();

    // Tomamos el valor del formulario
    const formValue = control.value;

    // Si el email es ese correo, entonces estara correcto
    if( formValue === 'hola@mundo.com' ){
      return {
        emailTaken: true,
      };
    }

    return null;
    // Lo interesante de las validacion asyncronas es que vamos a tener un estado del formulario que no dira que es valido el formulario
    // hasta que todas las validaciones se terminen
  }

  // Esta validacion sincrona es para verificar que no se pueda poner ciertos nombres de usuario
  static notStrider(control: AbstractControl): ValidationErrors | null {
    // Tomamos el valor del formulario
    const value = control.value;

    // Si el nombre del usuario contiene ese nombre, entonces no se lo permitimos
    return value === 'strider' ? { noStrider: true } : null;
  }
}
