import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nSelectPipe } from '@angular/common';

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
  imports: [CardComponent, I18nSelectPipe],
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
}
