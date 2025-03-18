// aservice+tab para crear automaticamente
import { effect, Injectable, signal } from '@angular/core';
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

    /*
        Vamos a hacer persistente la informacion para que al actualizar el navegador no se piedra la informacion
        En los navegadores tenemos el apartado del
            * Local Storage: que tiene un espacio del navegador y aparte tiene un espacio por sitio web
            * Session Storage
            * Cookiees
            
        El Local y el Session funcion igual en el que tenemos que guardar Key/Value (El value tiene que ser String a fuerzas)
        con el Session cada vez que cerremos todo el navegador se va a borrar lo que este almacenado y en el Local Storage se
        va a seguir perservando a pesar que salgamos del navegador y se reinicie la computadora (Mos o menos es igual a las 
        cookies solo que estas tiene menos espacios)

        Para grabar en el Local Storage nos vamos al servicio y vamos a usar una nueva funcion que son los Efectos, estos nos 
        sirven para poder ejecutar o disparar una accion secundaria. Le mandamos un callback que se va a disparar cada vez
        que una accion suceda (En este caso cada vez que los chracters cambien guarde en el Localstorage)

        Esto lo podemos implementar en el constructor pero lo mas comun es hacerlo asi:
        Poniendo un nombre descriptivo de lo que hace el efecto
        (Los efectos se pueden usar pero no es recomendable hacerlo para hacer peticiones HTTP)
        Con esto al crear la instancia del servicio se ejecuta este efecto, los efecto por defecto segun lo que le pasemos sabe 
        cuales son sus dependencias 

        Aqui solo guardamos en el LocalStorage (Pero no le estamos diciendo que Lea los datos de ahi para mantener los datos)
        tratemos de que los efectos solo realizen una tarea 
    */
   saveToLocalStorage = effect(() => {
    // Guardamos en el LocalStorage, en la Key "characters" va a estar almacenado el arreglo y el VALUE tiene que ser String
    // pero le estamos mandando este arreglo asi que lo Serializamos
        localStorage.setItem('characters', JSON.stringify(this.characters()));
   });


}