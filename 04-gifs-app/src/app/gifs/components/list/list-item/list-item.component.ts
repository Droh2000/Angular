import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gif-app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  imageUrl = input.required<string>();
}
