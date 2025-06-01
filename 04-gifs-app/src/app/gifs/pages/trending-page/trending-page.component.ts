import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [ListComponent],
  templateUrl: './trending-page.component.html',
})
// Este "implements" tiene que ver con el ciclo de vida de los componentes, el "AfterViewInit" nos permite llamar un metodo
// cuando la vista ya esta creada y componentes ya fueron renderizados
export default class TrendingPageComponent implements AfterViewInit{
  /*imageUrls: string[] = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
  ];*/

  // Aqui metemos el servicio de nuestra peticion GET ("inject" es el que usamos para injectar dependencias)
  // Con esto angular verifica si hay una instancia del "GifService" si ya la hay la injecta aqui,si no existe la crea
  GifService = inject(GifService);

  // Le inyectamos el nuevo servicio donde cada vez que hagamos scrol le almacenaremos la poscicion en la que se quedo
  scrollStateService = inject(ScrollStateService);

  // Tomamos la referencia al HTML que pusimos en el "component" con "#", tenemos dos elementos para tomar referencias a piezas del HTML
  // viewChild es solo para un elemento, y el viewChildren es para cuando tenemos varios elementos, entre comillas le pasamos el selector
  // que creamos
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  // Cuando la vista es inicializada ocupamos mover el scroll
  ngAfterViewInit(): void {
    // Primero verificamos si existe el scroll, sino no hace nada y se sale de la funcion
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    // Esto es a la posicion a la cual se mueve el scroll
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  // Esto se ejecutara cada vez que hagamos Scroll
  onScroll( event: Event ){
    // "nativeElement" es para obtener el elemento HTML, se le pone el signo de ? porque en el momento que se crea el componente
    // todavia no existe el HTML
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    // Verificamos si no exste el Scroll solo se salga de la funcion
    if( !scrollDiv ) return;

    // Sacamos la posicion que ocupamos del scroll
    // Esto es lo que tenemos que conservar, el mejor lugar para hacerlo es en Memoria que seria en un servicio (Es lo mismo donde estan almacenados todos los gifs que se obtuvieron de la peticion)
    const scrollTop = scrollDiv.scrollTop;
    // Sacamos cuanto espacio en la pantalla tenemos (viewPoint)
    const clientHeight = scrollDiv.clientHeight;
    // Sacamos el scroll posible que podemos hacer
    const scrollHeight = scrollDiv.scrollHeight;

    // Tenemos que tomar lo que hemos hecho de scroll mas lo que tenenmos del "scrollheight" y si eso supera el valor total que se puede hacer de scroll
    // ahi es cuando estamos llegando a la final de la pantalla
    // scrollTotal = scrollTop + clientHeight
    // Con esta variable detectamos si estamos al final, le sumamos un valor para detectar cuando ya esta cerca del final y no en el final, para que asi
    // empezemos a hacer otra peticion para traer mas GIF y dar la imprecion que tenemos un Scroll infinito
    const isBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    // Asi cuando salimos de la pagina que por defecto se destruye y volvemos a entrar que se vuelve a contruir, por este servicio es que mantenemos el
    //  valor del pixeles que hemos avanzados, entonces cuando la pantalla se vuelve a construir nosotros tenemos que mover el scroll
    this.scrollStateService.trendingScrollState.set(scrollTop);

    // Disparamos la peticion cuando llegamos casi al final del Scroll
    if( isBottom ){
      this.GifService.loadTrendingGifs();
    }
  }

  // Mostrar los Gifs en pantalla
  // Podemos implementarlos de varias formas (En este caso solo llamaremos el Service de arriba en el HTML)
}
