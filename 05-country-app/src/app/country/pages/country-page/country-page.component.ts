import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  // Implementacion de otra Forma
  // Vamos a buscar y conseguir una forma de traer los datos por codigo del pais
  // Podriamos hacerlo con un observable para estar pendiente de los cambios pero como en nuestra pantalla siempre vamos a salirnos
  // y regresar, podriamos hacerlo con un snapshot para saber como se encotraba la ruta
  //  El "ActivatedRoute" tiene la informacion de la ruta activa y si llamamos "snapshot" le estamos pidiendo la informacion como se encuentra en el momento
  //    OJO: Que esto no es reactivo por lo que si cambiamos el valor directamente de algun boton, no se recibira la notificacion del cambio a solo que nos salgamos de la ruta y regresemos a ella
  // y de ahi tomamos de los parametros que por como tenemos definido el archivo de rutas: 'by/:country' es lo que tenemos que poner para obtener esta informacion
  countryCode = inject( ActivatedRoute ).snapshot.params['code'];

  countryService = inject(CountryService);

  // Ejecutamos la peticion HTTP (Obtenemos toda la informacion del pais a mostrar)
  // Como lo que vamos a conectar es un Observable es mejor un RxResource
  countryResource = rxResource({
    // request -> Es la informacion de los argumentos que queremos mandar a la funcion de abajo
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      // Aqui tenemos que regresar un observable
      return this.countryService.searchCountryByAlphaCode(request.code)
    },
  });
}
