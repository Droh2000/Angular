// Vamos a crearnos un pipe para hacer funcionar los botones
// este los vamos a usar para filtrar por los elementos que se nos muestra
// Los pipes no solo los podemos usar en las exprecciones, sino tambien cuando tenemos un valor computado, IF, FOR
import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../app/interfaces/hero.interfaces';

@Pipe({
  name: 'heroSortBy'
})

export class HeroSortByPipe implements PipeTransform {
  // Queremos recibir todo el Arreglo de la Data y Ordenarlo
  // ademas recibimos un argumento por el cual queremos ordenar, para no declarar el tipado como String y luego tener que mapearlo
  // mejor vamos a recibir cual propertie que tenga el Hero y usarla como un filtro, por eso usamos el KeyOf y le indicamos que puede ser null para recibir algun valor Null
  transform(value: Hero[], sortBy: keyof Hero | null ): Hero[] {
    // El pipe no muta el objeto, lo que hace es transformarlo visualmente
    // Queremos que cada vez que precionemos alguno de los botones se mande la propertie correspondiente por el "sortBy"
    // Verificamos que si no hay ningun valor regrese todo el objeto sin ningun tipo de procesamiento
    if( !sortBy ) return value;

    switch( sortBy ){
      case 'name':
        // Aplicamos una ordenacion por nombre
        return value.sort((a, b) => a.name.localeCompare(b.name));
      case 'canFly':
        // Aplicamos una ordenacion por este dato que es Booleano
        return value.sort((a, b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1));
      case 'color':
        // Aplicamos una ordenacion por el color que es un numero
        return value.sort((a, b) => a.color - b.color);
      case 'creator':
        // Esta es una ordenacion de una enumeracion
        return value.sort((a, b) => a.creator - b.creator);
      default:
        return value;
    }
  }
}
