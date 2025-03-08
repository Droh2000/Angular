import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Este decorador tranforma nuestra clase a un componente (Esto nos permite colocarlo en el HTML, angular sabe como
// renderizarlo y donde podemos usarlo)
@Component({
  selector: 'app-root',// Esto es como crear una etiqueta HTML (En el archivo "index.html" vemos su referencia)
  // Esto lo podemo ver en el "app.component.html" donde importamos las rutas por las cuales podremos navegar
  // importamos este componente personalizado para poder cambiar entre paginas de la navegacion
  imports: [RouterOutlet],
  // Estas son referencias a los archivos
  templateUrl: './app.component.html',
  // En verciones antiguas de angular tenemos (En la version actual esto se trabaja por defeccto)
  // standalone: true, -> Este es para que un componente sea a la vez un modulo
})

// Vemos como no es mas que una simple clase (Casi todo en Angular las cosas son clases)
export class AppComponent {
  // Esta es una propiedad 
  title = 'bases';
}
