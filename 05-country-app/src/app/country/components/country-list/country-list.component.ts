import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {

  // Asi le decimos que va a recibir un argumento el componente
  // Aqui vemos que si usamos la interface (RESTCountry[]) de los tipos de datos originales de la API, nuestra aplicacion se vuelve muy dependiente
  // de un ente externo que no controlamos
  countries = input.required<Country[]>();

  // Vamos a poder recibir otro tipo de informacion
  // Especificamente recibimos los argumentos de si <esta cargando, error y si esta vacio
  // al no especificarle algun valor entre los parentesis podremos recibir un undefined
  errorMessage = input<string|unknown|null>();// Tenemos que especificarle estos tipos de datos para que no nos de error al usar el componente
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
