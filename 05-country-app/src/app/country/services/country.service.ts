import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
  searchByCapital( query: string ){
    query = query.toLowerCase();
    // Este es el Endpoint de la API
    return this.http.get(`${API_URL}/capital/${query}`);
  }
}
