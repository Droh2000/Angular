import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
    // Hay una propiedad que es el selector que es para darle un nombre al componente, estas paginas no lo ocupan porque
    // estas estan directamente conectadas en el Router
    templateUrl: './hero-page.component.html',

    // Importacion del Pipe que vamos a usar
    imports: [ UpperCasePipe ]
})
export class HeroPageComponent{
    name = signal('Ironman');
    age = signal(45);

    // Signal Computada
    // Entre parentesis le pasamos lo que ocupamos que sea nuetro callback para regresar el valor de esta variable
    heroDescription = computed(() => {
        // Aqui podemos desarrollar la logica requerida
        const description = `${ this.name() } - ${ this.age() }`;
        return description;
        // Estas Signal no tenemos los metodos de Set y update solo si cambia el valor de la propieadad es cuando se vuelven a redibujar
    });

    // Funcion para Capitalizar usando la senal computada
    capitalizedName = computed(() => this.name().toUpperCase() );

    /*getHeroDescription(){
        // Para obtener el valor de la Signal la invocamos como si fuera una funcion
        return `${ this.name() } - ${ this.age() }`;
    }*/
   // Como ya con lo de arriba regresamos un String no requerimos esta funcion


    changeHero(){
        // No dependemos del valor anterior por eso usamos SET
        this.name.set('Spiderman');
        this.age.set(22);
    }

    resetForm(){
        this.name.set('Ironman');
        this.age.set(45);
    }

    changeAge(){
        this.age.set(60);
    }
}