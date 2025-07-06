// Nos creamos un servicio para tener centralizado la logica del cambio de idiomas
// y pueda ser disparado desde cualquier parte de la aplicacion
import { Injectable, signal } from '@angular/core';

// Tipos de idiomas permitidos
export type AvailableLocal = 'es'|'fr'|'en';

@Injectable({providedIn: 'root'})
export class LocaleService {
  // Esto nos dira cual es el idioma que esta establecido (Le especificamos como tipado solo los que vamos a soportar)
  private currentLocale = signal<AvailableLocal>('es');

  constructor(){
    // Por defecto cuando configuramos para que ocurra el cambio en la interface a travez de los botones, no es reactivo (no ocurre nada), nosotros tenemos que recargar manualmente la aplicacion
    // para que aplique los cambios tenemos que mantener y perservar el valor del local que la persona cambio (Para esto usamos el LocalStorage)
    this.currentLocale.set(
      // 'local' es la llave que vamos a recibir para saber que idioma aplicar que es el de la inyeccion que hicimos en el app.config
      (localStorage.getItem('locale') as AvailableLocal) ?? 'es'
    );

  }

  get getLocale(){
    return this.currentLocale();
  }

  // Manejamos el cambio en otro idioma
  changeLocal(locale: AvailableLocal){
    // Establecemos el valor en el LocalStorage
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    // Para ejecutar el cambio de manera dinamica recargamos la pantalla
    window.location.reload();
  }

}
