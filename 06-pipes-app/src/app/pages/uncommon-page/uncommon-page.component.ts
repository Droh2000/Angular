import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Juan',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canada'
}

const client2 = {
  name: 'Juana',
  gender: 'female',
  age: 38,
  address: 'Nigeria'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe , I18nPluralPipe, SlicePipe, JsonPipe, KeyValuePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  // i18n Select -> Este es el Pipe que vamos a usar
  // Signal para mantener un cliente
  client = signal(client1);

  // El pipe funciona con un Objeto Mapa que nos permite cambiar contenido de forma dinamica deacuerdo a una condicion
  invitationMap = {
    // Ponemos segun el genero la palabra que tenemos que cambiar
    male: 'invitarlo',
    female: 'invitarla'
  }

  // Toggle para cambiar de cliente
  changeClient(){
    if( this.client() === client1 ){
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  //i18n Plural
  // Objeto dentro una signal para especificar que acciones segun la cantidad de clientes en la lista
  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando', // Opcion por defecto que saldra y con # obtenemos la cantidad
  });

  // Este lo usamos cuando tenemos varios datos, colecciones, numeros de elementos
  clients = signal([
    'Joseph',
    'Benjamin',
    'Juda',
    'Simeon',
    'Nataly',
  ]);

  deleteClient(){
    // Actualizamos la lista de clientes
    this.clients.update( (prev) => prev.slice(1) );
  }

  // KeyValuePipe
  profile = {
    name: 'Juan',
    age: 36,
    address: 'Lomas Turbas'
  }

  // Async Pipe
  // para que funcione requerimos algo asyncrono
  // Esta es una propiedad que es el valor de una promesa
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos Data en la promes');
    }, 3500);
  });

  // Mismo pipe pero con un Observable
  // El Observable que va a generar el interval esta basado en un SetTimeout de JS donde cada tiempo
  // que especifiquemos vamos a estar emitiendo un valor
  myObservableTimer = interval(2000).pipe(
    map( (value) => {
      value + 1 // Asi empesara en 1 y no en 0 para que sea tomado en cuenta en el IF de la vista
    }),
    // Con el "pipe" conectamos diferentes operadores en este observable
    // Con "Tap" disparamos efectos secundarios
    tap( (value) => {
      console.log('tap:', value);
    })
  );
  // Cuando no hay nada suscrito a un observable no pasara nada, hasta ese entonces nos emitira los valores
  // Y cuando se ejecuta y nos pasamos a otra pantalla seguira emitiendo valores (Al entrar y salir de esa pantalla muchas veses
  // tendremos fuga de memoria)
}
