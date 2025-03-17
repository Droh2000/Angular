/*
  La creacion de este componente fue diferente en el que haciando click derecho en la carpeta components elegimos la opcion de 
  "Angular Schematics: Generate a File", Del menu que nos sale elegimos:
    * La opcion Component
    * Precionamos Enter para confirmar la Ruta
    * Escribimos el nombre del componente
    * Aqui nos salen caracteristicas (Con el icono del diamante) que son de Pagos, asi que precionamos None para no elegir 
    * La opcion de Advance Options
    * Elegimos el de "skipStyle" para que no nos genere el archivo CSS y elegimos el "externaTemplate", luego precionamos OK
    * La opcion de "Enable and set as default for this workspace folder"
    * La opcion de "Enable and set as default for this workspace folder"
    * La opcion de Confirm
*/
import { Component, input } from '@angular/core';
import type { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  // Para recibir aqui los datos del padre
  // Actualmente se recomienda que usemos la funcion "input" donde podremos recibir una informacion como un argumento desde
  // el mundo exterior y para que sea obligatorio usamos el ".required()" (Veremos que es de tipo InputSignal)
  // Hay que decir que tipo de informacion es el que fluye dentro de este objeto (En este caso es del tipo Character)
  // Con esto ya desaparece el error en el HTML
  characters = input.required<Character[]>()
  listName = input.required<string>();
}
