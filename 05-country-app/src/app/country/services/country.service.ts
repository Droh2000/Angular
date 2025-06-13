import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // Si requerimos ejecutar una peticion HTTP ocupamos injectar el servicio
  // Cuando hacemos la injeccion estamos tomando ese objeto pero ese objeto tiene que estar proveeido en algun lugar
  // El lugar donde tenemos que proveerlo es en el "app.config.ts"
  private http = inject(HttpClient);

  // Aqui hacemos las peticiones HTTP
  // El argumento es el query de busquedad
  searchByCapital( query: string ): Observable<Country[]>{
    query = query.toLowerCase();
    // Este es el Endpoint de la API (LE especificamos el tipo de dato que el Observable nos emitira)
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
        // Uso del mapper (Para tener solo la informacion que vamos a usar y no todas las propiedades)
        // Usamos los operadores de RXJS, con el "pipe" podemos hacer cosas cuando el observable nos emita un valor
        .pipe(
          // El primero valor que le pasemos el MAP es el valor del observable, si llamamos mas MAP, cada map va a recibir el valor del map anterior
          // Aqui vamos a regresar las propiedades que solo nos interesa
          map((restCountries) =>
            CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
            // En Angular tenemos este componente para Atrapar los errores de mejor forma
            catchError((error) => {
              // Tenemos que lanzar un error aqui para que se detenga la ejecucion, con esta funcion RXJS nos genera un valor de un observable
              // que hasta aqui no llega la ejecucion y la termina
              return throwError(() => Error('No se pudo obtener los paises'));
            }),
          )
        );
  }

  // Otro endpoint para obtener los paises
  searchByCountry( query: string ): Observable<Country[]>{
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
        .pipe(
          map((restCountries) =>
            CountryMapper.mapRestCountryArrayToCountryArray(restCountries),
            // Hasta el momento la pagina carga muy rapido y no da tiempo de poner un Loading, asi que vamos a relentizar para ponerlo como demostracion
            // Con esta funcion podemos relentizar por algun tiempo en base a una fecha o una tarea
            // delay(3000),
            catchError((error) => {
              return throwError(() => Error(`No se pudo obtener los paises con el query: ${query}`));
            }),
          )
        );
  }

}
