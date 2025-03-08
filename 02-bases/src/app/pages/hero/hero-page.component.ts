import { Component, signal } from "@angular/core";

@Component({
    // Hay una propiedad que es el selector que es para darle un nombre al componente, estas paginas no lo ocupan porque
    // estas estan directamente conectadas en el Router
    templateUrl: './hero-page.component.html',
})
export class HeroPageComponent{
    name = signal('Ironman');
    age = signal(45);

    getHeroDescription(){
        // Para obtener el valor de la Signal la invocamos como si fuera una funcion
        return `${ this.name() } - ${ this.age() }`;
    }

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