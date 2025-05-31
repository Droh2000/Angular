// Aqui vamos a colocar toda la informacion centralizada de nuestros Gifs
// Usamos: a-services+TAB para generar este codigo (Tenemos que tener las extenciones instaladas)
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environtments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

// Mantener los datos despues de recargar el navegador
const loadFromLocalStorage = () => {
  // Primero verificamos si tenemos Gifs, nosotros estamos almacenando un objeto en el LocalStorage
  // que seria: Record<string, gifs[]>
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';

  // Convertimos los datos obtenidos a un arreglo de gifs
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
}

// Los Servicios en angular trabajan como si fueran un Singleton con el objetivo de que tengamos un lugar centralizado para obtener la informacion
@Injectable({providedIn: 'root'})
export class GifService {
  // En Angular tenemos el HttpClient que es mejor que el FETCH, oara poder usarlo tenemos que inyectar esa dependencia
  private http = inject(HttpClient);

  // Debemos de tener un espacio para almacenar el estado de los Gifs que obtenemos de la peticion y asi mostrar la data en pantalla
  trendingGifs = signal<Gif[]>([]); // Aqui es donde estamos almacenando los gifs

  // Por defecto esta en TRUE porque tan pronto como el servicio se crea gracias al componente que lo monte o la funcion que llame la inyeccion del servicio
  // entonces esta en TRUE porque empezamos a crear la instancia
  trendingGifsLoading = signal(false);

  // Para sacar la pagina y es una signal porque la vamos a estar cambiando
  private trendingPage = signal(0);

  // Por el diseño de Masonry
  // Tenemos que crearnos algo como: [ [gif, gif, gif], [gif, gif, gif], [gif, gif, gif], ... ]
  // para asi meter un ciclo For dentro de otro ciclo For
  trendingGifGroup = computed<Gif[][]>(() => {
    // Aqui creamos la estructura del arreglo
    const groups = [];// Esto sera el valor de la Señal computada

    // Recorremos de 3 en 3 los elementos
    for (let i = 0; i < this.trendingGifs().length; i+=3) {
      // Con "slice" cortamos los 3 elementos que requerimos desde la posicion i hasta i+3
      groups.push( this.trendingGifs().slice(i, i + 3) );
    }

    return groups;
  });

  // Almacenamiento en cache de las busquedas que el usuario a realizado
  // para esto vamos a tener un objeto en el cual tendremos la palabra que busco seguido de un arreglo con los gifs correspondientes a esa palabra
  // asi si el usuario busca lo mismo, solo accesedera a ese elemento, si no esta lo agrega al objeto
  // En TS para cargar ese objeto tenemos "Record" cuya llave es la palabra de busquedad y el contenido es el arreglo de los gifs, este tipado se usa
  // cuando queremos un objeto donde sus llaves son dinamicas
  // Este objeto lo queremos meter en el LocalStorage para que al recargar el navegador no perdamos los datos del historial
  // Despues de agregar el metodo en el valor inicial al recargar el navegador se mantendran los datos
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  // Ademas queremos tomar cada una de las llaves (Las palabras de busquedad que ah realizado el usuario) para crear un listado de todo lo que el usuario a buscado
  // tenga su acceso en el menu de cada una de sus busquedas, podemos tomar las llaves del mismo objeto de arriba pero para eso tenemos la Signal Computadas
  // asi cada ves que la Signal "searchHistory" cambie automaticamente se va a volver a actualizar los valores del "searchHistoryKeys"
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  // Cuando creemos una instancia llamaremos la peticion HTTP
  constructor(){
    this.loadTrendingGifs();
    // Al recargar la pagina veremos que se mantienen los mismo Gifs porque el servicio no se a vuelto a crear
  }

  // Este efecto se va a dispara cada vez que el "searchHistory" cambie
  saveGifsToLocalStorage = effect(() => {
    // En el localStorage solo podemos almacenar Strings por eso esta conversion
    const historyString = JSON.stringify(this.searchHistory());

    // Almacenamos en el LocalStorage
    localStorage.setItem('gifs', historyString);
  });

  // Hacemos la peticion HTTP solo con llamar el objeto "http"
  loadTrendingGifs() {

    // Si estamos cargando lo sacamos del metodo porque no queremos que se llamen masivamente las peticiones ya que tenemos que esperar a que se resuelva
    // la peticion antes realizada para volver a hacer otra peticion (Solo vamos a tener una llamada de este metodo a la vez)
    if( this.trendingGifsLoading() ) return;

    // Aqui quere decir que ya entro una solicitud y lo cambiamos a True para que no entren mas solicitudes y bloquear este metodo
    this.trendingGifsLoading.set(true);

    // Usamos la variable de entorno donde configuramos el URL principal, luego la parte que sigue, los parametros que requiere se los mandamos entre {}
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        // Les damos el mismo nombre que viene en la URL
        api_key: environment.giphyApiKey,
        limit: 20, // Esta es la cantidad de Gifs que queremos
        // Tenemos que sacar cual pagina queremos mostrar, esto esta en "offset" dado de la Signal que acabamos de crear y le multiplicamos la cantidad que ya avanzo de elementos
        offset: this.trendingPage() * 20,
      }
      // La peticion se va a disparar hasta que llamemos el metodo "suscribe" y mandaremos un callback donde recibimos la respuesta de la peticion
    }).subscribe( (resp) => {
      // console.log({ resp });
      // Podemos implementar la logica aqui pero mejor nos creamos un objeto que nos permita hacer la transformacion (Mapper) para obtener solo los datos que nos interesa
      const gifs = GifMapper.mapGiphyItemToGifArray( resp.data );
      // Con ".set" estabamos sobrescribiendo el valor actual de la signal y requerimos el valor previo de la Signal para insertar los nuevos Gifs, no ocupamos sobrescribirlos sino añadirlos
      // con "update" le mandamos por funcion los Gifs anteriores y con [] regresamos inmediatamente un arreglo
      this.trendingGifs.update(currentGifs => [
        ...currentGifs, // esparcimos los gifs anteriores
        ...gifs // agregamos los gifs que vienen de la peticion
      ]);

      // Incrementamos el numero de pagina para que no nos salga la misma pagina por tanto los mismos gifs repetidos
      this.trendingPage.update( currentPage => currentPage + 1 );

      // Despues de obtener los datos (Aqui ya tenemos que cuando terminamos la peticion lo regresamos a False)
      this.trendingGifsLoading.set(false);
    });
    // En la documentacion veremos que en el GIFs obtendremos un Observable de retorno, este es un patron de Diseño que nos dice que un objeto puede estar emitiendo valores
    // para estar al pendiente de lo que la peticion resuelva y obtendremos e objeto resuelto de la peticion HTTP
  }

  searchGifs(query: string){
    // Este el Endpoint para buscar contenido
    // Retornamos la peticion HTTP (Ahora regresamos el Observable que emitira un arreglo de nuestros Gifs)
    // La idea de los servicios es que nos den los datos ya procesados como los requerimos sin tener que hacer alguna operacion fuera
    return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }) // Si no ponemos el suscribe no se dispara la peticion
    // Para procesar los datos tenemos los operadores de rxjs que los encadenamos con este metodo "pipe"
    .pipe(
      // Aqui podemos encadenar funcionamiento espciales de los observables
      // "Tap" nos sirve para disparar efectos secundarios (Cuando nuestro Obesrvable emita un valor va a pasar dentro del PIPE po todos lo operadores
      //  empezando de arriba hacia abajo) y por ultimo nos regresara el Obervable
      //    tap( resp => console.log({tap: resp}))
      // Lo que realmente requerimos es emitir un valor transformado y para eso tenemos el operador MAP, con este podemos recorrer cada uno de los elementos de
      // la respuesta y regresar una transformacion diferente
      // Le pasamos el valor de la respuesta anterior "resp" (Segun lo que emitamos, en este caso al ser el primero es de la respuesta HTTP)
      map( ({ data }) => data),
      // Aplicamos otra transformacion igual (Para obtener el arreglo con las propiedas que nos interesa)
      map( (items) => GifMapper.mapGiphyItemToGifArray(items) ),

      // Cada vez que se busque un elemento y tengamos una resolucion del mismo va a ser nesesario usar un efecto secundario
      // dentro le pasamos el listado de los Gifs que la persona ha buscado
      tap( items => {
        // Como queremos actualizar el valor de una Signal usamos update, dentro vamos a tener el Historial y entre parentesis para hacer un return implicito de un nuevo objeto
        this.searchHistory.update( history => ({
          ...history, // Obtener todos los datos que teniamos en el History
          // Propiedad Computada
          [query.toLowerCase()]: items,
        }))
        // El Tab no requiere que nosotros regresemos algo
      }), // Con solo esta logica podemos manejar el hisotrial
    );
    /*.subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemToGifArray( resp.data );
      console.log({search: gifs});
      // No podemos hacer un "return gifS" porque eso seria solo el Return de este Callback el cual no se ve reflejado al metodo "searchGifs"
      // Entonces tenemos que poder llamar el ".suscribe" desde la pagina HTML
    });*/
  }

  // Metodo que recibiendo la llave nos regrese el historial previamente almacenado en el "searchHistory"
  getHistoryGifs(query: string): Gif[] {
    // Sacamos el valor que tenga en el "query" y si no esta nos regresa un arreglo vacio
    return this.searchHistory()[query] ?? [];
  }
}
