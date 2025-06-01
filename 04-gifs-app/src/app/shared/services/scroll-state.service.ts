import { Injectable, signal } from '@angular/core';

// Este servicio es para almacenar la posicion del Scroll, ya que el uso del cache no es viable porque puede sufrir modificaciones facilmente
// los servicios son preservados a travez de toda la aplicacion de angular, obiamente si recargamos la pagina, purgamos todo
@Injectable({providedIn: 'root'})
export class ScrollStateService {
  // La informacion la podemos guardar de muchas maneras pero si estamos siguiendo un estandar es mejor seguir con este como las Signals
  // la posicion inicial que le damos es 0 porque cuando la pagina se carga por primera vez no hemos hecho ningun scroll pero conforme hagamos scroll
  // podemos destruir el componente y guardar la posicion del scroll o cada vez que el valor del scroll cambie ahi lo podemos grabar
  trendingScrollState = signal(0);

  // Si quisieramos hacerlo para mas paginas, el crearnos muchas properties no es viable, para eso creamos un objeto de tipo Record, donde la clave es
  // la pagina correspondiente y el valor es la cantidad total de pixeles que tiene esa pagina
  /*pagesScrollState: Record<string, number> = {
    'page1': 1000,
    'page2': 500,
    'aboutPage': 160,
  }*/
}
