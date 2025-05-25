import { Component, input } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-app-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  // La data que esperamos ahora es una lista de Gifs
  gifs = input.required<Gif[]>();
}
