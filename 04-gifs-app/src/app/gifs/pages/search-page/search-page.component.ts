import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListComponent } from  '../../components/list/list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  // Despues de implementado el metodo en el "gif.service.ts" tenemos que injectar el servicion para usarlo
  gifService = inject( GifService );

  // Esto es lo que pasara cuando se precione Enter para buscar
  onSearch( query: string ){
    this.gifService.searchGifs(query);
  }

}
