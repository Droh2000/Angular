import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, SlicePipe } from '@angular/common';

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
  imports: [CardComponent, I18nSelectPipe , I18nPluralPipe, SlicePipe, JsonPipe],
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
}
