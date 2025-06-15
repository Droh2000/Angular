import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent {
  // Componente para mostrar detalladamente la informacion de un pais
  country = input.required<Country>();

  // Esto se hizo para poder mostrar la Fecha porque no podemos usar directamente el Date en {{ }} del html
  currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
