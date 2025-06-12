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
      name: restCountry.name.common,
      capital: restCountry.capital.join(','), // Los unimos por un join en caso que venga mas de uno
      population: restCountry.population,
    }
  }

  static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[] ): Country[] {
    return restCountries.map( this.mapRestCountryToCountry );
  }
}
