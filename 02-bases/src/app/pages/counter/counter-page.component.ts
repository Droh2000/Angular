// El nombre de agreagr ".component" es una nomenclatura recomendada por Angular

import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

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
    `,
    // Una forma de demostrar con o sin Zoonless donde en este caso lo cambiamos a nivel de componente pero tambien se puede de manera global
    // Cuando activamos el "OnPush" le decimos que este componente no sera aplicado el ZoneJS
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPageComponent { // El nombre de la clase debe ser igual al nombre de los archivos

    // Queremos mostrar el valor de un contador
    counter = 10;

    // Creamos una señal del counter y establecemos el valor inicial de la senal
    // Al poner el cursor encima de la variable veremos que dice "WritableSignal" porque es una señal que se pueden escribir
    // ya que hay otras que no que solo son de solo lectura
    counterSignal = signal(10);

    // Despues de agregar el push: Todo funciona correctamente porque Angular sabe exactamente cuando queremos hacer cambios en el State 
    // esto porque son eventos pero que tal si disparamos algo que no sea directamente un Evento
    // Aqui cada 2 seg queremos sumar el valor del counter
    constructor() {
        setInterval(() => {
            // this.counter += 1;
            // Con esto veremos que si se ejecuta esta funcion pero el valor del counter no esta cambiando
            console.log('Tick');

            // Con la linea comentada arriba mejor mandamos a llamar la funcion para actualizar la senal
            // Del valor anterior le sumamos el valor de uno
            this.counterSignal.update((v) => v + 1);
            // Aqui si funciona de la manera esperada
        }, 2000);
        // Esto no cambia el valor del counter porque Angular le decimos que no corra el ZoneJS entonces no tiene forma de saber
        // que paso un cambio en esa propertie (Si comentamos la linea del OnPush veremos que si se visualizan los cambios)

    }

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