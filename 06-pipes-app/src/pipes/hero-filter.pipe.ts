import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../app/interfaces/hero.interfaces';

@Pipe({
  name: 'heroFilter'
})

export class heroFilterPipe implements PipeTransform {

  transform(value: Hero[], search: string): Hero[] {
    // Podemos buscar por cualquiera de los argumentos que se nos manden
    if( !search ) return value;

    search = search.toLowerCase();

    return value.filter(
      // Esto solo aplica para una palabra, si fueran mas seria otra logica
      hero => hero.name.toLowerCase().includes(search)
    );
  }
}
