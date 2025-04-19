import { Component } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";

@Component({
  selector: 'gif-app-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
})
export class ListComponent { }
