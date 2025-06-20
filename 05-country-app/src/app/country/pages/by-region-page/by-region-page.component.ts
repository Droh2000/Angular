import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  // Aqui requerimos cual fue la region seleccionada para saber cual perservar
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  // Esto de as Region es temporal, solo para implementar lo de SelectedRegion
  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region')?? '') as Region;

  // Detectamos cual es tipo de boton seleccionado (Cual Region elegio el usuario)
  // En lugar de null le establecemos una region por defecto
  selectedRegion = linkedSignal<Region|null>(() => this.queryParam ?? 'Americas');

  countryResource = rxResource({
    request: () => ({
      region: this.selectedRegion()
    }),
    loader: ({ request }) => {
      if( !request.region ) return  of([]); // Si no hay nada seleccionado regresamos un arreglo vacio

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          // El nombre que le pasemos por el get al "queryParam" debe ser el mismo aqui
          region: request.region,
        }
      });

      return this.countryService.searchByRegion( request.region )
    }
  });
}
