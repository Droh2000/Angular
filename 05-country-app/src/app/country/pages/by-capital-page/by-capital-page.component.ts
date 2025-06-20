import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  // Despues de configurar el servicio en el "app.config.js" podemos proveer el servicio aqui que llama los Endpoints
  countryService = inject(CountryService);
  /*
  // Para mostrar la informacion tenemos que saber varias etapas en nuestra aplicacion
  isLoading = signal(false); // Para cuando estamos buscando informacion
  isError = signal<string|null>(null);// Cuando tengamos un error que puede que tengamos en string el codigo del error y null si no hay nada
  // Aqui usamos nuestro modelo con todas las propiedades que esperamos en la respuesta Original de la API (RESTCountry[]), cosa que no es recomendado
  // por eso creamos el maper para recibir solo las propiedades que nos interesa
  countries = signal<Country[]>([]);

  // Queremos que cuando alguien escribe o preciona enter, debemos emitir cual es el valor seleccionado o que la persona escribio
  onSearch(query: string){
    // Aqui no hacemos nada porque no queremos que empieze a bombardear un monton de peticiones
    if( this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null); // Limpiamos el error en caso de que lo tengamos


    // La peticion solo se dispara hasta que nos suscribamos de donde obtenemos la respuesta
    this.countryService.searchByCapital(query)
      // Este no es el lugar de hacer el mapper porque sino tendriamos que emplearlo en todos los lugares donde se usa el servicion
      // Aqui hacemos el procedimiento de la verificacion en el suscribe
      .subscribe({
        // Aqui le podemos enviar varias propiedades, "next" es cuando todo sale bien y vamos a tener el siguiente valor del observable
        // "error" es para cuando pasa una excepcion y el "completed" va a suceder cuando pase el error o el next
        next: (countries) => {
          this.isLoading.set(false);
          this.countries.set(countries);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.countries.set([]);
          // En "err" esta el mensaje que pusimos en el RXJS que captura el error del "country.service"
          this.isError.set(err);
        }
        // Aqui vemos como manejamos la excepcion del obervable y la forma de mostrar este en mensaje en pantalla tenemos que meterle logica a la pagina
        // lo que nos complica la existencia, para esto tenemos varias formar de manejar una excepcion en un obervable (Para esto lo implementamos en el Service)
      });
    }
  */

  // Desde la mas nueva version de angular +19 -> Esta es la funcion Resources
  // a esta le mandamos un objeto de configuracion, entre sus parametros esta la "request"
  // que es una funcion donde vamos a poder la serie de argumentos que queremos que pase en la funcion loader
  // esta funcion es la otra propiedad "loader" que es la que hace el trabajo asyncrono, asi cada vez
  // que cambiemos el valor de una signal automaticamente va a volver a disparar el loader con los valores que
  // cambiaron de esa signal

  // query = signal("");

  // Los Recursos tienen varias propiedades
  /*countryResource = resource({
    // Aqui ocupamos que sea el Query de busquedad, donde cada vez que alguien precione enter o cambie de valor aqui vamos a tener actualizado
    request: () => ({
      query: this.query()
    }),
    // Esto es lo que nosotros queremos disparar
    // Si desestructuramos los argumentos de la funcion obtenemos varios elementos: "abortSignal" es para el caso en el que queremos cancelar la peticion para hacer una nueva
    // "previus" es el valor anterior, "request" es la respuesta que obtenemos lo que especificamos en el "request" en este caso solo es el Query y por eso son signal porque asi son
    // reactivos que cuando cambia algun Signal cambia el "resources" y se vuelve a disparar
    loader: async ({ request }) => {

      // Al usar el "request" veremos que nos sale en el autocompletdo
      // Si el usuario no escribio nada entonces no hay que regresar nada
      // Aqui hay tomar en cuenta que estamos emitiendo un valor de un string vacio
      if( !request.query ) return of([]);

      // Si tenemos una respuesta hacemos la peticion HTTP
      //  return this.countryService.searchByCapital(request.query);
      // La linea de arriba nos regresa un Resource que sera un arreglo vacio o un Observable que emite un ubjeto de Country, esto no esta muy bien
      // cuando trabajamos con el Reources tenemos que regresar promesas pero aqui vamos a ver como hacerlo con Obervables
      // Con este RXJS podemos convertir cualquier observable en una promesa (Tomando el primero valor que emita)
      return await firstValueFrom(
        this.countryService.searchByCapital( request.query )
      );
    }
  });*/

  // Tomamos la informacion de la ruta activa ("ActivatedRoute" obtenemos informacion relevante a la ruta), asi podemos obtener todas sus properties
  activatedRoute = inject(ActivatedRoute);
  // Este va a venir como argumento opcional en el URL, aqui va a venir lo que el usuario previamente habia buscado
  // el problema es que la propiedad "queryParamMap" nos regresa un Observable (Esto lo sabemos porque esta el "suscribe") pero si lo podemos transformar a un Signal
  // todo dependen de que tanta reactividad queremos, ya que si cada vez que cambie el argumento en el URL requerimos detonar la busquedad de nuevo entonces
  // ahi si convienen hacer una suscripcion para estar pendiente de los cambios pero si solo queremos leer el argumento una vez y de ahi eliminanrla porque ya no nos
  // interesa podemos usar mejor el metodo "snapshop" que es como una fotografia y no es reactiva de la informacion como esta en ese momento, de ahi podemos tomar el
  // metodo de "query" (Tenemos dos, e igualmente si usamos los dos directamente nos regresan un Observable)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')?? ''; // Le decimos que busque el parametro llamado "query" si no viene nos retornara string vacio (Asi nos aseguramos que siempre sea un String)

  // Ocupamos navegar a otra ruta porque el hecho que la URL cambie es una navegacion, y aqui agregamos el QueryParam
  // esto nos permite hacer el Router
  router = inject(Router);

  // Vamos a inicializar siempre este valor basado en el QueryParam
  //  query = signal(this.queryParam);
  // En angular tambien tenemos una mejor a lo de arriba porque podemos generar un Signal con un valor inicializado cuando es computado
  // Esto es con un LinkednSignal
  query = linkedSignal(() => this.queryParam);

  // Implementacion con el RXresource para evitarnos errores que teniamos
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);

      // En el momento en que el query cambie es cuando queremos actualizar el URL
      // El valor no se lo podemos pasar dentro del array separado por coma despues de la ruta porque estamos
      // usando la navegacion por segmentos es decir se estaria esperando en la configuracion del angular Router
      // que tangamos definido el Query (Que no lo tenemos definido estaticamente en "countru.routes.ts" porque este query es opcional)
      // asi que fuera del array separado por coma mandamos los Extras
      this.router.navigate(['/country/by-capital'], {
        // Solo agregamos el QueryParam
        queryParams: {
          query: request.query,
        }
      });// Si recargamos la pagina los datos se preservan porque estamos actualizando la URL

      return this.countryService.searchByCapital(request.query);
    }
  })
}
