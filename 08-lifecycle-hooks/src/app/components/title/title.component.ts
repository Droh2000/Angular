import { Component, input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  // Este input lo convertira automaticamente en una Signal porque la forma antigua de crear los inputs en angular
  // era con un "@Input" que es el decorador de properties
  title = input.required<string>();

  // Uso del OnChages
  // Si tenemos varias propiedades en la clase, esto se recibiria como un objeto, es por eso que aqui se ejecuta con un For
  ngOnChanges(changes: SimpleChanges) {
    // Esto nos va a decir cual fue la informacion que cambio
    console.log('ngOnChanges');

    // Si requerimos hacer algo cuando cambie el valor de un input Propertie, tenemos que verficar si no es el primer cambio porque puede venir nulo
    for (const inputName in changes) {
      const inputValue = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValue.previousValue}`);
      console.log(`Current ${inputName} == ${inputValue.currentValue}`);
      console.log(`Is First ${inputName} == ${inputValue.firstChange}`);
    }

    // Aqui veremos como las propiedades en algun punto en el tiempo tienen el valor de undefined, luego nos muestra el valor actual
    // y si es la primera propiedad que cambio
  }
}
