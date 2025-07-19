import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../app/interfaces/hero.interfaces';

@Pipe({
  name: 'heroTextColor'
})

export class HeroTextColorPipe implements PipeTransform {

  transform(value: Color): string {
    return ColorMap[value];
  }
}
