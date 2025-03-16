import { Component, signal } from '@angular/core';

// Para especificar el tipo de dato del arreglo
interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  imports: [],
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
    { id: 3, name: 'Piccolo', power: 3000}
  ]);
}
