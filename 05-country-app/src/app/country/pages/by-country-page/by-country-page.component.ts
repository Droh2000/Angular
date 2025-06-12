import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  query = signal("");

  // Esto es como funciona con promesas
  /*countryResource = resource({
    request: () => ({
      query: this.query()
    }),
    loader: async ({ request }) => {
      if( !request.query ) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry( request.query )
      );
    }
  });*/

  // Implementacion con el "RxResource"
  countryResource = rxResource({
    request: () => ({
      query: this.query()
    }),
    loader: ({ request }) => {
      // Si el Texto que se ingreso fue vacio pero como estamos obligados a regresar un Observable
      // para que no nos de error usamos el RXJS de "of" que nos permite regresar un observable basado en lo que le pasemos
      if( !request.query ) return  of([]);

      // aqui podemos mandar a llamar directamente el observable
      return this.countryService.searchByCountry( request.query )
    }
  });

}
