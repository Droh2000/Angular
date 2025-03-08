// El nombre de agreagr ".component" es una nomenclatura recomendada por Angular

import { Component, signal } from "@angular/core";

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

    // Creamos una señal del counter y establecemos el valor inicial de la senal
    // Al poner el cursor encima de la variable veremos que dice "WritableSignal" porque es una señal que se pueden escribir
    // ya que hay otras que no que solo son de solo lectura
    counterSignal = signal(10);

    // Metodo para incrementar el valor del contador, recibimos el valor por el cual queremos incrementarlo
    increaseBy(value: number){
        // Hacemos referencia a la misma propiedad
        this.counter += value;

        // Actualizacion del valor de un Signal basada en un valor anterior
        // this.counterSignal.set(this.counterSignal() + value); // Del valor que tenga le sumamos el nuevo valor, pero esta sintaxis es dificil de entender
        // Con esta funcion podemos mandar un callback function que por su inicializacion espera un numero y regresa un numero (Esto se recomienda que hagamos)
        this.counterSignal.update( (current) => current + value );
    }

    resetCounter(){
        this.counter = 0;
        // Para actualizar el valor de una Signal hay varias formas, esta es una
        this.counterSignal.set(0);
        // Ahora cuando tenemos una actualizacion en el valor de una Signal pero dependen del valor anterior de la Signal
        // se recomienda que hagamos un Update no un SET porque el SET ignora cualquier valor que tenga y solo pone el nuevo valor
        // pero cuando dependemos del valor anteiror hay varias formas de hacerlo
    }
}

// Despues de crear nuestro primero componente debemos preguntarnos como vamos a mostrarlo
// Todo dependen del tipo de componente y como lo queremos mostrar (Tenemos dos formar, desde las rutas
// y desde la importacion de otro componente), en este caso queremos que esta sea una pagina que queremos
// mostrar (Para eso nos vamos al archivo "äpp.routes.ts")