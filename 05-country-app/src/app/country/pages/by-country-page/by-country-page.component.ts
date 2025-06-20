import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  //query = signal("");

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

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')?? '';
  query = linkedSignal(() => this.queryParam);

  // Implementacion con el "RxResource"
  countryResource = rxResource({
    request: () => ({
      query: this.query()
    }),
    loader: ({ request }) => {
      // Si el Texto que se ingreso fue vacio pero como estamos obligados a regresar un Observable
      // para que no nos de error usamos el RXJS de "of" que nos permite regresar un observable basado en lo que le pasemos
      if( !request.query ) return  of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        }
      });

      // aqui podemos mandar a llamar directamente el observable
      return this.countryService.searchByCountry( request.query )
    }
  });

}
