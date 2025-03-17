import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

// Para especificar el tipo de dato del arreglo
interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  imports: [
    // NgClass
  ],
  templateUrl: './dragonball.component.html',
})
export class DragonballComponent {
  // Queremos iterar los elementos de la lista por la cantidad de personajes que nosotros tengamos almacenados
  // Nos vamos a crear un arreglo de personajes llamaodo "charcter" (Que sera una señal), como al crear arreglos
  // Angular nos pone el tipo de dato "NEVER" nos creamos una interfaz para ponerle el tipo
  characters = signal<Character[]>([
    // Inicializamos el arreglo (Estos datos son los que mostraremos en la lista del HTML)
    { id: 1, name: 'Goku', power: 9001},
    { id: 2, name: 'Vegeta', power: 8000},
    { id: 3, name: 'Piccolo', power: 3000},
    { id: 4, name: 'Yamcha', power: 500},
  ]);

  /* Para esto nos creamos una Signal Computada
  powerClasess = computed(() => {
    // Vamos a regresar un objeto que sirva para evaluar cuales son las clases que queremos colocar en el HTML
    // Para el indicador de la KEY lo tenemos que poner entre comillas y la clase solo se aplica si da TRUE
    // Por eso en este caso este ejercicio seria mejor usar el modificador de clase ("class.BootstrapClass") porque de esta
    // forma tenemos que iterar y saber el personaje
    return {
      'text-danger': true,
    }
  })*/
}
