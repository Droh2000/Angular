import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environtments/environment';
//import { environment } from '../../../../../environtments/environment';

@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeaderComponent {
  // Cambiar el contenido del HTML en base a las propiedades que especificamos en las variables de entorno
  envs = environment;
}
