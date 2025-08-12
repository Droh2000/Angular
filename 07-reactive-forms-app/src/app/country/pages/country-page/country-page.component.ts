import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

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

  // Tenemos que estar pendiente de los cambios del selector de la region y cuando eso ocurra
  // disparar una peticion (Tenemos varias formas de hacer esto)
  // Aqui le pasamos el campo que nos interesa estar al pendiente y al ser un observable le lanzamos el suscribe
  /*formRegionChanged = this.myForm.get('region')!.valueChanges.subscribe(value => {
    // Aqui tenemos el valor de la region
    console.log({ value });
  });*/
  // Uno de los incovenientes de hacerlo de esta forma es que estamos creando una suscrpcion, si bien cuando salgamos de la pantalla se destruye
  // esta suscrpcion nunca se va a limpiar (Aunque no se vuelva a llamar siempre quedara por ahi)
  // asi que deberiamos que cuando el componente se desmonta hacer la limpieza de la suscripcion

  // Una mejor forma es trabajarlo con Signals donde gracias al efecto tenemos la funcion para limpiar la suscripcion
  // recordemos que los efecto se disparan tan pronto el componente es montado
  onFormChanged = effect( ( onCleanup ) => {
    const regionSuscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionSuscription.unsubscribe();
      countrySubscription.unsubscribe();// Borramos las suscripciones cuando ya no se ocupen
    });
  });

  onRegionChanged() {
    // Esta suscripcion nos va a permitir limpiar la region
    return this.myForm.get('region')!.valueChanges
      // El incoveniente es que tenemos que disparar una peticion HTTP tan pronto cambie la region pero en Rxjs de angular
      // cuando trabajamos con observables podemos llamar el metodo pipe() para ejecutar codigo cuando se emite un valor
      .pipe(
        // Con tap() disparamos efectos secundarios
        tap( () =>
          // Si la region cambia, todo el formulario deberia de cambiar
          // Aqui le pasamos el selector que queremos limpiar
          this.myForm.get('country')!.setValue('')
        ),
        tap( () => this.myForm.get('border')!.setValue('')),
        // Limpiar el arreglo de los paises (Tambien podemos crear un tap() que haga varias cosas)
        tap( () => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        // PASO IMPORTANTE
        // Cuando tengamos el valor de "region" transformar la peticion HTTP y regresar la informacion correspondiente
        // la peticion es la de "getCountriesByRegion()" para esto tenemos este operador
        // Con el "switchMap" transformamos un observable y regresar otro diferente, a este le damos acceso a la region del valor
        // que cambiamos
        switchMap( region => this.countryService.getCountriesByRegion(region ?? ''))
      )
      // Gracias al "switchMap" no vamos a tener la region sino "countries"
      .subscribe( countries => {
        // Aqui tenemos el valor de la region pero ademas queremos obtener los paises que coincidan con esa region
        this.countriesByRegion.set(countries);// Esto es lo que ocupamos colocar en el segundo selector
      });
  }

  // Para cuando el selector 2 que es el del pais principal cambie
  onCountryChanged() {
    // Obtenemos los valores del campo "country" y estaremos al pendiente cuando cambie de valor
    return this.myForm.get('country')!.valueChanges
    // Juntamos operadores RXjs porque tenemos que lanzar otra peticion HTTP cuando se lanze este suscription
    .pipe(
      // Para limpiar los datos del tercer selector en caso que se cambie los valores de otros selectores
      tap( () => this.myForm.get('border')!.setValue('') ),
      // Con este nos protegimos que si hay un valor vacio que no continue
      filter((value) => value!.length > 0),
      // Nos traemos la informacion del pais pasandole el codigo del pais que nos regresa la API
      switchMap( alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '') ),
      // Gracias a la implementacion de arriba aqui tenemos el el pais, asi que llamamos el servicio para
      // convertir al nombre del pais
      switchMap( country => this.countryService.getCountryNamesByCodeArray( country.borders ) )
    )
    // Aqui por las implementaciones de arriba tenemos el arreglo de los paises que viene de la respuesta
    .subscribe( ( borders ) => {
      // Este es el momento en cual sabemos cuando mostrar los valores en el selector tres
      this.borders.set(borders);
    });
  }
}
