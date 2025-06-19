import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  // Recibimos el tipo de Placeholder que queremos mostrar en el input
  // La palabra "Buscar" es el valor por defecto que tendra el input
  placeholder = input('Buscar');

  // Esto es lo que queremos que emita el componente (Un valor)
  value = output<string>();

  // Controlamos como el Search input va a estar emitiendo los valores
  // este siempre va a tener el valor actualizado de la caja de texto
  inputValue = signal<string>('');

  // Este es para establecerle el tiempo que tardara en mostrar los resultados
  // despues de terminar de escribir y cuando se llame el componente hacemos que se pueda establecer
  debounceTime = input(300);

  // Para emitir el valor (Cada vez que cambiemos el input value queremos disparar ese efecto)
  // Los efectos tienen una funcion de limpieza que se ejecuta cada vez que queremos destruir el componente
  // o cuando la Signal se vuelve a disparar, en este caso cada vez que tengamos un nuevo valor en el input
  // se disparar la funcion de limpieza
  debouceEffect = effect((onCleanup) => {
    // Cuando Angular detecta que esto es una Signal dentro del efecto, cada vez que la signal cambia va a disparar este efecto
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      // Aqui emitimos el valor
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);// Limpiamos el timeOut para que no sigua emitiendo valores
    });
  });
}
