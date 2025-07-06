import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {
  // Esto son los elementos que esperamos recibir para la tarjeta
  title = input.required();



}
