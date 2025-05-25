import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-gif-history',
  imports: [ListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  // Recibimos el argumento dinamico que nos estan mandando por la URL
  // El "query" es lo que viene por la URL, esta linea asi seria la ruta activa, llamamos para obtener los parametros que viene por la URL
  // Esto es un Observable eso quiere decir que nos va a estar emitiendo valores conforme la URL cambie
  // En si estariamos en la misma ruta lo unico que cambia son los parametros asi que llamamos al "suscribe" para tomar los ultimos cambios
  /*query = inject(ActivatedRoute).params.subscribe(
    params => {
      // De los "params" podemos obtener el argumento dianmico de la url que definimos en "app.routes.ts" que en este caso se llama "query"
      console.log(params['query']);
  });*/

  gifService = inject(GifService);

  // Una forma de simplificar el codigo de arriba es usando el metodo de "tosignal" para transformar cualquier Observable
  // en un signal (Aqui tenemos un signal que cambia automaticamente y son todos los Params), de estos Params solo nos interesa el valor "query"
  query = toSignal(
    // Para extraerle el "query" al observable usamos el metodo Pipe (Todos los observable lo tiene) con el cual podemos conectarle los diferentes
    // operadores de RXJS (Cada vez que este observable emite un valor, tenemos el valor actualizado en la variable "query")
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'] )
    )
    // Una ventaja de usar los "inject" y no usando constructores que seria la forma de antes, es que ahora podemos encadenar procedimientos, concatenando
    // una nueva propertie que dependen del valor emitido anteriormente
  );


  gifsByKey = computed(() => {
    // Regresamos lo que tengamos en el servicio de Gifs que seria el historial mandandole el Query
    return this.gifService.getHistoryGifs(this.query());
  });
}
