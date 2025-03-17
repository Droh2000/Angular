import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragonballService } from '../../service/dragonball.service';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonballsuper',
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {
  // Uso del servicio
  // Primero requerimos inyectar el servicio (Tenemos dos formas de hacerlo)
  // Vamos a importar la instancia creada del servicio (Si es la primera vez que se instancia la clase
  // ahi se crea la instancia, si ya estaba instanciada previamente nos regresa ya el mismo valor)
  // Una forma es usando el constructor
  /*constructor(
    public dragonballService: DragonballService
  ){}*/
  // Asi podemos ir a los metodos y con solo llamar:
  // this,dragonballService.Metodo/Propiedad
  // La idea de estos servicios es tener el manejo del estado, peticiones HTTP y lo centralizemos de esta manera
  // Eso es la inyeccion tradicional

  // La forma recomendad es
  // Solo mandamos la referencia a la clase
  // Asi podemos tomar la instancia de la clase incluso en funciones siempre y cuando estemos dentro del contexto de la App
  public dragonballService = inject(DragonballService);
  

}