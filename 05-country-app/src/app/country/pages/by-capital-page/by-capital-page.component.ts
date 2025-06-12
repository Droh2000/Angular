import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  // Despues de configurar el servicio en el "app.config.js" podemos proveer el servicio aqui que llama los Endpoints
  countryService = inject(CountryService);

  // Para mostrar la informacion tenemos que saber varias etapas en nuestra aplicacion
  isLoading = signal(false); // Para cuando estamos buscando informacion
  isError = signal<string|null>(null);// Cuando tengamos un error que puede que tengamos en string el codigo del error y null si no hay nada
  // Aqui usamos nuestro modelo con todas las propiedades que esperamos en la respuesta Original de la API (RESTCountry[]), cosa que no es recomendado
  // por eso creamos el maper para recibir solo las propiedades que nos interesa
  countries = signal<Country[]>([]);

  // Queremos que cuando alguien escribe o preciona enter, debemos emitir cual es el valor seleccionado o que la persona escribio
  onSearch(query: string){
    // Aqui no hacemos nada porque no queremos que empieze a bombardear un monton de peticiones
    if( this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null); // Limpiamos el error en caso de que lo tengamos


    // La peticion solo se dispara hasta que nos suscribamos de donde obtenemos la respuesta
    this.countryService.searchByCapital(query)
      .subscribe((countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);

        // Este no es el lugar de hacer el mapper porque sino tendriamos que emplearlo en todos los lugares donde se usa el servicion
        // Aqui hacemos el procedimiento de la verificacion en el suscribe
      });
  }
}
