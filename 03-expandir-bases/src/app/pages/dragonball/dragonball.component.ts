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

  // Para el manejo de los Inputs nos creamos una signal para cada uno 
  name = signal('Gohan');
  power = signal(100);

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

    addCharacter(){
      // Aqui se sale y no continua 
      if( !this.name() || !this.power() || this.power() <= 0 ){
        return;
      }
      // Sacamos el nuevo personaje
      const newCharacter: Character = {
        id: this.characters().length + 1, // Esto lo hacemos asi porque es la forma en que podemso hacerlo por ahora
        name: this.name(),
        power: this.power(),
      }
      // Insertarlo al arreglo del personajes
      // Podemos hacerlo asi:
      this.characters().push(newCharacter);
      // No se recomienda hacerlo como arriba porque cuando queremos cambiar le valor de un Signal no hay que usar estos metodos
      // Lo que se recomienda es usar el metodo "update" (Para actualizar el valor de la Signal y que se notifique en todos los lugares)   
      this.characters.update(
        // Aqui tendriamos el listado de personajes anteriores y de una vez estamos haciendo el Return implicito porque esta entre parentesis el "list"
        // y vamos a regresar el listado actual (...list) y le agregamos el nuevo personaje
        (list) => [...list, newCharacter]
      );

      this.resetFields();
    }

    // Para que cuando se precionen el boton de Agregar automaticamente se limpien los campos
    resetFields(){
      this.name.set('');
      this.power.set(0);
    }
}
// Aqui tenemos muchas funcionalidades en una sola pagina que podemos separar en varios componentes, toda la logica, la pagina, 
// todo esta en una soa parte
