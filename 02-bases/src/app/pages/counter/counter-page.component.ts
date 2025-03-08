// El nombre de agreagr ".component" es una nomenclatura recomendada por Angular

import { Component } from "@angular/core";

// Esto por defecto es una simple clase pero para que se combierta en un componente que podamos mostrarlo y renderizarlo
// Le colocamos el decorador @Component, estos por los menos requieren una pieza (Esto ya se nos indica en el mensaje del error)
@Component({
    template: `
        <!-- Para mostrar el valor de nuestro counter colocamos doble llaves (Ahi podemos colocar cualquier expreccion de JS) -->
        <h1>Counter: {{ counter }}</h1>
        <!-- Los eventos en Angular se ponen entre parentesis: (NombreEvento)="LoQueMandaAllamar"  -->
        <button (click)="increaseBy(1)">+1</button>
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
}

// Despues de crear nuestro primero componente debemos preguntarnos como vamos a mostrarlo
// Todo dependen del tipo de componente y como lo queremos mostrar (Tenemos dos formar, desde las rutas
// y desde la importacion de otro componente), en este caso queremos que esta sea una pagina que queremos
// mostrar (Para eso nos vamos al archivo "äpp.routes.ts")