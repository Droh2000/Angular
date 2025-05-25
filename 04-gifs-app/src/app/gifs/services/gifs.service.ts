// Aqui vamos a colocar toda la informacion centralizada de nuestros Gifs
// Usamos: a-services+TAB para generar este codigo (Tenemos que tener las extenciones instaladas)
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environtments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

// Los Servicios en angular trabajan como si fueran un Singleton con el objetivo de que tengamos un lugar centralizado para obtener la informacion
@Injectable({providedIn: 'root'})
export class GifService {
  // En Angular tenemos el HttpClient que es mejor que el FETCH, oara poder usarlo tenemos que inyectar esa dependencia
  private http = inject(HttpClient);

  // Debemos de tener un espacio para almacenar el estado de los Gifs que obtenemos de la peticion y asi mostrar la data en pantalla
  trendingGifs = signal<Gif[]>([]);

  // Por defecto esta en TRUE porque tan pronto como el servicio se crea gracias al componente que lo monte o la funcion que llame la inyeccion del servicio
  // entonces esta en TRUE porque empezamos a crear la instancia
  trendingGifsLoading = signal(true);

  // Cuando creemos una instancia llamaremos la peticion HTTP
  constructor(){
    this.loadTrendingGifs();
    // Al recargar la pagina veremos que se mantienen los mismo Gifs porque el servicio no se a vuelto a crear
  }

  // Hacemos la peticion HTTP solo con llamar el objeto "http"
  loadTrendingGifs() {
    // Usamos la variable de entorno donde configuramos el URL principal, luego la parte que sigue, los parametros que requiere se los mandamos entre {}
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        // Les damos el mismo nombre que viene en la URL
        api_key: environment.giphyApiKey,
        limit: 20, // Esta es la cantidad de Gifs que queremos
      }
      // La peticion se va a disparar hasta que llamemos el metodo "suscribe" y mandaremos un callback donde recibimos la respuesta de la peticion
    }).subscribe( (resp) => {
      // console.log({ resp });
      // Podemos implementar la logica aqui pero mejor nos creamos un objeto que nos permita hacer la transformacion (Mapper) para obtener solo los datos que nos interesa
      const gifs = GifMapper.mapGiphyItemToGifArray( resp.data );
      this.trendingGifs.set(gifs);

      // Despues de obtener los datos
      this.trendingGifsLoading.set(false);
    });
    // En la documentacion veremos que en el GIFs obtendremos un Observable de retorno, este es un patron de Diseño que nos dice que un objeto puede estar emitiendo valores
    // para estar al pendiente de lo que la peticion resuelva y obtendremos e objeto resuelto de la peticion HTTP
  }

  searchGifs(query: string){
    // Este el Endpoint para buscar contenido
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemToGifArray( resp.data );
      console.log({search: gifs});
    });
  }

}
