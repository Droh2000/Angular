import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-basic-pages',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe
  ],
  templateUrl: './basic-pages.component.html',
})
export default class BasicPagesComponent {
  // Tenemos estas tres properties
  nameLower = signal('juan');
  nameUpper = signal('JUAN');
  fullName = signal('jUaN ORtiz');

}
