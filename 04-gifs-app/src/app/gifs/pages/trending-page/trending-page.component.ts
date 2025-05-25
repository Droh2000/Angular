import { Component, inject } from '@angular/core';
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

  // Mostrar los Gifs en pantalla
  // Podemos implementarlos de varias formas (En este caso solo llamaremos el Service de arriba en el HTML)
}
