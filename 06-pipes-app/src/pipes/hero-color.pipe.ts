import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../app/interfaces/hero.interfaces';

@Pipe({
  name: 'heroColor'
})

export class HeroColorPipe implements PipeTransform {

  transform(value: number): string {
    return Color[value];
  }
}
