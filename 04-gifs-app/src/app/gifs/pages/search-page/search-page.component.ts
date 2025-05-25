import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ListComponent } from  '../../components/list/list.component';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  // Despues de implementado el metodo en el "gif.service.ts" tenemos que injectar el servicion para usarlo
  gifService = inject( GifService );

  // Estos son los Gifs que vamos a mostrar
  gifs = signal<Gif[]>([]);

  // Esto es lo que pasara cuando se precione Enter para buscar
  onSearch( query: string ){
    // Cuando llamamos el servicio cuando llamamos el "searchGifs" disparamos la peticion HTTP
    // Depues de la modificacion del metodo podemos llamar aqui el ".suscribe"
    this.gifService.searchGifs(query).subscribe((resp) => {
      // Por lo implementado en el Service ya tenemos los datos bien transformados
      this.gifs.set(resp);
    });
  }

}
