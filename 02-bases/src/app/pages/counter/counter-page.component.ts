// El nombre de agreagr ".component" es una nomenclatura recomendada por Angular

import { Component } from "@angular/core";

// Esto por defecto es una simple clase pero para que se combierta en un componente que podamos mostrarlo y renderizarlo
// Le colocamos el decorador @Component, estos por los menos requieren una pieza (Esto ya se nos indica en el mensaje del error)
@Component({
    // Usamos el "templateURL" para separar la logica en otro componente, no es obligatorio que se llame igual pero es recomendado
    // Tambien es recomendado colocar el './' al inicio
    // Cuandos los Templaes pasan de tres lineas es recomendable crearlos en una archivo aparte
    templateUrl: './counter-page.component.html',
    // Los estilos tambien los podemos definir aqui o crearlos en otro archivo cuando pasen de muchas lineas
    styles:`
        button{
            padding: 5px;
            margin: 5px 10px;
            width: 75px;
        }
    `
})
export class CounterPageComponent { // El nombre de la clase debe ser igual al nombre de los archivos

    // Queremos mostrar el valor de un contador
    counter = 10;

    // Metodo para incrementar el valor del contador, recibimos el valor por el cual queremos incrementarlo
    increaseBy(value: number){
        // Hacemos referencia a la misma propiedad
        this.counter += value;
    }

    resetCounter(){
        this.counter = 10;
    }
}

// Despues de crear nuestro primero componente debemos preguntarnos como vamos a mostrarlo
// Todo dependen del tipo de componente y como lo queremos mostrar (Tenemos dos formar, desde las rutas
// y desde la importacion de otro componente), en este caso queremos que esta sea una pagina que queremos
// mostrar (Para eso nos vamos al archivo "äpp.routes.ts")