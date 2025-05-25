// Aqui vamos a colocar toda la informacion centralizada de nuestros Gifs
// Usamos: a-services+TAB para generar este codigo (Tenemos que tener las extenciones instaladas)
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environtments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

// Los Servicios en angular trabajan como si fueran un Singleton con el objetivo de que tengamos un lugar centralizado para obtener la informacion
@Injectable({providedIn: 'root'})
export class GifService {
  // En Angular tenemos el HttpClient que es mejor que el FETCH, oara poder usarlo tenemos que inyectar esa dependencia
  private http = inject(HttpClient);

  // Cuando creemos una instancia llamaremos la peticion HTTP
  constructor(){
    this.loadTrendingGifs();
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
    });
    // En la documentacion veremos que en el GIFs obtendremos un Observable de retorno, este es un patron de Diseño que nos dice que un objeto puede estar emitiendo valores
    // para estar al pendiente de lo que la peticion resuelva y obtendremos e objeto resuelto de la peticion HTTP
  }

}
