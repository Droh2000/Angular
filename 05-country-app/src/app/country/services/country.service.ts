import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
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

  // Manejo del Cache
  // Si realmente requerimos un cambio en el doom porque hay alguna interaccion y ese cambio visualmente tiene que reflejarse por signals o efectos
  // o algun tipo de procesamiento cuando algo cambia y visualmente verse reflejado, ahi si deberiamos crearnos una Signal para el cache pero en este caso
  // solo sera una propiedad para cuando manualmente algo se dispare como un servicio o metodo de un servicio entonces ahi podemos acceder a la informacion
  // como si fuera una variable comun y corriente
  // Los MAPAS en Js son otro tipo de objeto muy similar a un conjunto (SET), la diferencia es que en los mapas podemos almacenar Pares de clave-valor
  // y los Set podemos almacenar valores unicos
  private queryCacheCapital = new Map<string, Country[]>();

  // Aqui hacemos las peticiones HTTP
  // El argumento es el query de busquedad
  searchByCapital( query: string ): Observable<Country[]>{
    query = query.toLowerCase();

    // Verificamos si ya tenemos un valor en el cache que concida con lo que se esta buscando
    if( this.queryCacheCapital.has(query) ){
      // Obtenemos la informacion que tenemos en el mapa y regresamos un Observable
      // si no tenemos nada que nos regrese un arreglo vacio
      return of( this.queryCacheCapital.get(query) ?? []);
    }

    // Vamos a hacer que en el momentos cuando escribimos algo y terminamos de hacerlo, automaticamente empieze a buscar
    // Nos salimos sin llegar al backend (Usamos esta funcion de RXJS para transformar el elementos al Observable que esperamos regresar)
    // En el momento que se deja de escribir se hace la peticion HTTP y no la hace por cada lectra que pongamos
    // Podriamos pensar de colocar esta logica dentro del servicio pero ese no es el sentido del Servicio, es solo hacer peticiones no esa logica
    // La logica se llama Debounce y el lugar para evitar bombardear el backend lo implementamos en el Input
    // return of([]);

    // Este es el Endpoint de la API (LE especificamos el tipo de dato que el Observable nos emitira)
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
        // Uso del mapper (Para tener solo la informacion que vamos a usar y no todas las propiedades)
        // Usamos los operadores de RXJS, con el "pipe" podemos hacer cosas cuando el observable nos emita un valor
        .pipe(
          // El primero valor que le pasemos el MAP es el valor del observable, si llamamos mas MAP, cada map va a recibir el valor del map anterior
          // Aqui vamos a regresar las propiedades que solo nos interesa
          map((restCountries) =>
            CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
            // Efecto secundario para meterle la informacion del Map
            tap( (countries) => this.queryCacheCapital.set(query, countries)),
            // En Angular tenemos este componente para Atrapar los errores de mejor forma
            catchError((error) => {
              // Tenemos que lanzar un error aqui para que se detenga la ejecucion, con esta funcion RXJS nos genera un valor de un observable
              // que hasta aqui no llega la ejecucion y la termina
              return throwError(() => Error('No se pudo obtener los paises'));
            }),
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

  // Queremos acceder a la informacion de un usuario en especifico si entramos a la url establecida como: /country/by/ID-Pais
  searchCountryByAlphaCode( code: string ) {
    // Siempre recibimos un "RESTCountry" porque asi esta creado el API y ademas en Arreglo
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        // Como seguimos recibiendo un arreglo pero solo queremos regresar un pais, asi que del arreglo regresamos solo el primer elemento
        // pero si no se encuentra nada nos puede dar undefined
        map((countries) => countries.at(0)),
        catchError((error) => {
            console.log(error);
            return throwError(
              () => Error(`No se pudo obtener los paises con el codigo: ${code}`)
            );
          })
        );
    }
}
