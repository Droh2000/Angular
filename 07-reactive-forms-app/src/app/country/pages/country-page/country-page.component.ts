import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-country-page',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  // Llenamos la informacion del primer selector
  regions = signal( this.countryService.regions );
  // Obtenemos la data de los otros selectores y no le pasamos la data porque estos se rellenaran segun la opcion del selector elegida
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  // Creamos el formulario con los campos que tendra
  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });
}
