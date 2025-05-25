import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
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

  // Una forma de simplificar el codigo de arriba es usando el metodo de "tosignal" para transformar cualquier Observable
  // en un signal (Aqui tenemos un signal que cambia automaticamente y son todos los Params), de estos Params solo nos interesa el valor "query"
  query = toSignal(
    // Para extraerle el "query" al observable usamos el metodo Pipe (Todos los observable lo tiene) con el cual podemos conectarle los diferentes
    // operadores de RXJS
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'] )
    )
  );
}
