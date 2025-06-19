import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);

  // Esto lo dejamos como una propiedad normal
  // Para saber cuando crearla normal o cuando crearla asociada a un Signal, para que sea signal es si la requerimos Reactiva
  // (Reaccionar basado en un cambio) pero como en este caso no van a cambiar solo asi normal las dejamos
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  // Detectamos cual es tipo de boton seleccionado (Cual Region elegio el usuario)
  selectedRegion = signal<Region|null>(null);

  countryResource = rxResource({
    request: () => ({
      region: this.selectedRegion()
    }),
    loader: ({ request }) => {
      if( !request.region ) return  of([]); // Si no hay nada seleccionado regresamos un arreglo vacio

      return this.countryService.searchByRegion( request.region )
    }
  });
}
