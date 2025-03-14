import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Al agregar el componente en el HTML se autoimporta y tenemos que guardar los cambios del archivo sino tendremos un error
import { NavbarComponent } from "./components/shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'bases';
}
