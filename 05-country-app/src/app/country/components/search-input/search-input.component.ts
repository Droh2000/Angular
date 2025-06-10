import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  // Recibimos el tipo de Placeholder que queremos mostrar en el input
  // La palabra "Buscar" es el valor por defecto que tendra el input
  placeholder = input('Buscar');

  // Esto es lo que queremos que emita el componente (Un valor)
  value = output<string>();

}
