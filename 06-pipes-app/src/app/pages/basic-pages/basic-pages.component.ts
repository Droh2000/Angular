import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-basic-pages',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
  ],
  templateUrl: './basic-pages.component.html',
})
export default class BasicPagesComponent {
  // Tenemos estas tres properties
  nameLower = signal('juan');
  nameUpper = signal('JUAN');
  fullName = signal('jUaN ORtiz');

  // Esta Signal contiene la fecha actual, esto por si solo no se va a actualizar
  customDate = signal( new Date() );

  // Para poder ver los cambios en tiempo real y que se este actualizando la fecha conforme avanza el tiempo
  // para eso vamos a usar un efecto de Angular
  //  CUIDADO CON USAR ESTO porque si no limpiamos el Efecto cada vez que salgamos este seguira ejectuando y cuando entremos volvera a crearse
  //  otro a parte del que ya estaba creado, creando muchos en conjunto, para limpiarlo en la funcion recibimos ya un argumento
  tickingDateEffect = effect((onCleanup) => {
    // Actualizamos por medio de un intervalo actualizando cada segundo
    const interval = setInterval(() => {
      this.customDate.set(new Date());
    }, 3000);

    onCleanup(() => {
      // Esto es lo que se va a ejecutar cuando se destruya el efecto
      clearInterval(interval);
    });
  });

}
