import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  // Para regresar a la pantalla anterior
  location = inject(Location);

  // Asi decimos que nos regrese del historial anterior no a una ruta en contreto
  goBack(){
    this.location.back();
  }

}
