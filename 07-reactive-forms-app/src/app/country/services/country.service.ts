import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({providedIn: 'root'})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  // Injectamos el objeto Http para poder realizar las peticiones
  private http = inject(HttpClient);

  // Esto nos servira para mostrar el primer selector este arreglo con los Continentes
  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ]

  // Lo hacemos de esta forma porque si regresamos un arreglo a pesar que sea privado y alguien lo modifica
  // nos va a modificar el arreglo, asi con este metodo cualquier modificacion solo seria a nivel del valor regresado por el metodo
  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion( region: string ): Observable<Country[]> {
    // Si no hay ninguna region seleccionada previamente regresamos un arreglo vacio, pero al estar obligador del tipo Obervable
    // tenemos que usar la funcion generadora off()
    if( !region ) return of([]);

    // Le pasamos los argumentos al endpoint para mostrar los paises del continente seleccionado
    const url = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    // Hacemos la peticion Http
    return this.http.get<Country[]>(url);// Podemos trabajar con objetos complejos pero podriamos crearnos un mapper para simplificarlo
  }

  // Obtener el nombre del pais en base al codigo que le pasemos (Que es lo que nos regresa la API)
  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  // Obtener la lista de paises con los que hace frontera el pais que fue seleccionado
  getcountryBorderByCodes( border: string[] ){

  }
}
