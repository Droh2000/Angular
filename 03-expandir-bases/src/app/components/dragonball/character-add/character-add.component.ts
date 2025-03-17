import { Component, input, output, signal, WritableSignal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');
  power = signal(0);
  
  /*
    Vamos a emitir el valor de los inputs y que esos valores impacten nuestra lista
    para esto asi como tenemos el input tambien tenemos el "output" para que los componentes
    se puedan comunicar al mundo exterior

    Este es el evento que nostros vamos a disparar que va a emitir un personaje
  */
 newCharacter = output<Character>();

  addCharacter(){
    if( !this.name() || !this.power() || this.power() <= 0 ){
      return;
    }
    
    const newCharacter: Character = {
      // el id lo generamos de manera aleatorio 
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    }
    
    /*this.characters.update(
      (list) => [...list, newCharacter]
    );*/
    // tambien tenemos el metodo de .subscribe que es para estar pendiente de todos los cambios que se emitan
    this.newCharacter.emit(newCharacter);

    this.resetFields();
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
