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
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  // Esto se ejecutara cada vez que hagamos Scroll
  onScroll( event: Event ){
    // "nativeElement" es para obtener el elemento HTML, se le pone el signo de ? porque en el momento que se crea el componente
    // todavia no existe el HTML
    const scrollDiv = this.scrollDivRef()?.nativeElement;


  }

  // Mostrar los Gifs en pantalla
  // Podemos implementarlos de varias formas (En este caso solo llamaremos el Service de arriba en el HTML)
}
