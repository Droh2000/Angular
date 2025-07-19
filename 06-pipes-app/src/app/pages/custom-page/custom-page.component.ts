import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanFlyPipe } from '../../../pipes/canfly-case.pipe';
import { HeroColorPipe } from '../../../pipes/hero-color.pipe';
import { HeroTextColorPipe } from '../../../pipes/hero-text-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../../pipes/hero-creator.pipe';
import { HeroSortByPipe } from '../../../pipes/hero-sort-by.pipe';
import { Hero } from '../../interfaces/hero.interfaces';
import { heroFilterPipe } from '../../../pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe, // Importamos nuestro Pipe
    CanFlyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
    HeroSortByPipe,
    heroFilterPipe,
  ],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
  name = signal('Juan Gabriel');

  upperCase = signal(true);

  heroes = signal(heroes); // Tenemos los datos que vamos a mostrar en la tabla

  sortBy = signal<keyof Hero | null>(null); // Para saber cual propertie Ordenar

  searchQuery = signal('');// Para la caja de texto que es el buscador
}
