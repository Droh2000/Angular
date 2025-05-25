// Esto es lo que nos interesa extraer de este objeto
// La idea aqui es que recibamos el objeto que recibimos del consumo de la API y regresemos un objeto solo con los datos que nos interesa

import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
  // Metodos estaticos para no crear instancias
  static mapGiphyItemToGif( item: GiphyItem ): Gif {
    return {
      // Asi si en el futuro la pagina cambia el nombre de alguna propiedad solo las cambiamos aqui en el mapper
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    }
  }

  // Como lo que nos regresa la respuesta es un arreglo entonces nos creamos este metodo
  static mapGiphyItemToGifArray( items: GiphyItem[]): Gif[] {
    // Usamos la funcion de arriba para transformar cada uno de los elementos
    return items.map( this.mapGiphyItemToGif );
  }
}
