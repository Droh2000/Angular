import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [ListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
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

  // Tomamos la referencia al HTML que pusimos en el "component" con "#", tenemos dos elementos para tomar referencias a piezas del HTML
  // viewChild es solo para un elemento, y el viewChildren es para cuando tenemos varios elementos, entre comillas le pasamos el selector
  // que creamos
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  // Esto se ejecutara cada vez que hagamos Scroll
  onScroll( event: Event ){
    // "nativeElement" es para obtener el elemento HTML, se le pone el signo de ? porque en el momento que se crea el componente
    // todavia no existe el HTML
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    // Verificamos si no exste el Scroll solo se salga de la funcion
    if( !scrollDiv ) return;

    // Sacamos la posicion que ocupamos del scroll
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

  }

  // Mostrar los Gifs en pantalla
  // Podemos implementarlos de varias formas (En este caso solo llamaremos el Service de arriba en el HTML)
}
