import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanFlyPipe } from '../../../pipes/canfly-case.pipe';
import { HeroColorPipe } from '../../../pipes/hero-color.pipe';
import { HeroTextColorPipe } from '../../../pipes/hero-text-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../../pipes/hero-creator.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe, // Importamos nuestro Pipe
    CanFlyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
  ],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
  name = signal('Juan Gabriel');

  upperCase = signal(true);

  heroes = signal(heroes); // Tenemos los datos que vamos a mostrar en la tabla
}
