import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {

  // Asi le decimos que va a recibir un argumento el componente
  // Aqui vemos que si usamos la interface (RESTCountry[]) de los tipos de datos originales de la API, nuestra aplicacion se vuelve muy dependiente
  // de un ente externo que no controlamos
  countries = input.required<Country[]>();
}
