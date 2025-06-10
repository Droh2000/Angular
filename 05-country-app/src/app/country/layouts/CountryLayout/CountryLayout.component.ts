import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'app-country-layout',
  // Lo que lo hace especial es que internamente vamos a tener el RouterOutlet
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './CountryLayout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryLayoutComponent { }
