import { type Country } from "../interfaces/country.interface";
import { type RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  // Metodos para intercambiar de nuestras propiedades de la interface a las propiedades
  // que nos manda por defecto el RestAPI
  static mapRestCountryToCountry( restCountry: RESTCountry ): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      // Como los datos vienen en arreglo con clave y valor, tenemos que tomar la Key computada y si viene nulo le asignamos un valor por defect
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      // Despues de agregar las modificanes en la opcion del menu por region, le ponemos que si el pais tiene capital le agarra el Join sino lo ignore
      capital: restCountry.capital?.join(','), // Los unimos por un join en caso que venga mas de uno
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    }
  }

  static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[] ): Country[] {
    return restCountries.map( this.mapRestCountryToCountry );
  }
}
