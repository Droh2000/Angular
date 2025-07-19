import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../../pipes/toggle-case.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe // Importamos nuestro Pipe
  ],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
  name = signal('Juan Gabriel');

  upperCase = signal(true);
}
