// Para crear rapidamente usamos el Snipper: aipe + TAB
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase' // Este es el selector que usaremos cuando lo colquemos en el HTML
})

export class ToggleCasePipe implements PipeTransform {

  // El hecho de heredar de "PipeTransform" nos permite ejecuta este metodo cada vez que se ejecute o cambie la data
  // en la cual estamos asociando el Pipe, es decir si la data asociada fuera una Signal y cada vez que cambie se estaria
  // llamando este metodo Transform, cuando es la primera vez que el Pipe se ejecuta, tambien vuelve a llamar el Transform
  // Los Argumentos del metodo son:
  //  "Value" -> Es la data que le estamos mandado al Pipe
  //  ...args -> Seria todo el esto de argumentos (Estos los borramos)
  // Especificamos el tipo de datos que vamos a trabajar
  //  "upper" -> Para activar si queremos aplicarle la tranformacion a los datos o no
  transform(value: string, upper: boolean = true): string {
    return upper ? value.toUpperCase() : value.toLowerCase();
  }
}
