import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  // Despues de configurar el servicio en el "app.config.js" podemos proveer el servicio aqui que llama los Endpoints
  countryService = inject(CountryService);

  // Queremos que cuando alguien escribe o preciona enter, debemos emitir cual es el valor seleccionado o que la persona escribio
  onSearch(query: string){
    // La peticion solo se dispara hasta que nos suscribamos de donde obtenemos la respuesta
    this.countryService.searchByCapital(query)
      .subscribe(value => console.log(value) );
  }
}
