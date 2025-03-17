// aservice+tab para crear automaticamente
import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

/*
    Como vemos los servicios en angular no son mas que una clase pero que trabaja con
    las inyecciones de dependencias (DI) entonces nos va a trabajar el servicio como si fuera un singleton
    es decir que cuando usemo ese servicio vamos a tener la misma instancia siempre
    (No importa donde la creemos ni la usamemos siempre vamos a estar apuntando a la misma ubicacion en memoria)

    La idea de los servicios es que nos sirva como lugar centralizado de la informacion, esto va a hacer que no 
    importa si tenemos datos en una pantalla y salidamos a otra pantalla y luego regresemos a la pantalla de los 
    datos, el servicio nos permiti mantener la informacion ya que el servicio se mantiene (A pesar que el cambiar
    de pantalla nos destruye los componentes)

    El @Injectable es un decorador que transforma la clase en un servicio, el "provideIn" (Hay diferentes pero se maneja
    comunmente con el "root" para que el servicio este de forma Global en la aplicacion)
*/
@Injectable({providedIn: 'root'})
export class DragonballService {
    // Metemos tods esta logica aqui porque esto sera el lugar centralizado de la Data de los Characters
    characters = signal<Character[]>([
        { id: 1, name: 'Goku', power: 9001},
        { id: 2, name: 'Vegeta', power: 8000},
      ]);
    
      // Esto es lo que vamos a mandar a llamar y para insertarlo
      addCharacter(character: Character){
        // Aqui insertamos el personaje (Para actualizar el signal usamos update)
        this.characters.update((list) => [...list, character]);
    
      }
}