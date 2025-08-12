import { afterNextRender, afterRender, Component, effect, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

// Esto lo creamos para ver mejor el mensaje de los consoles.log
const log = ( ...messages: string[] ) => {
  console.log(
    `${ messages[0] } %c${ messages.slice(1).join(', ') }`,
    'color: #bada55',
  );
}

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  // Propiedades de la clase
  traditionalProperty = 'Juan';
  signalProperty = signal('Juan');

  // El Constructor es parte del ciclo de vida de los componentes porque cuando se crea una instancia del componente
  // esto es lo que se va a ejecutar (Cuando navegamos a la ruta, se crea el componente a diferencia de los servicios que se mantienen)
  constructor(){
    log("Constructor Llamado");

    // Con Zoonles podemos ejecutar los cambios directos en signals sin problemas porque angular sabe en donde ocurrio el cambio
    setTimeout(() => {
      this.signalProperty.set('Juan Carlos');
    }, 2000);
  }

  // Metodos para los botones para que ocurra el cambio entre las propiedades
  changeTraditional(){
    this.traditionalProperty = 'Juan Ortiz';
  }

  changeSignal(){
    this.signalProperty.set('Juan Ortiz');
  }

  // Estas son mas etapas del ciclo de vida (Estos son los efectos)
  // Tambien dentro del effect tendremos la funcion "onCleanUp" que funciona como el onDestroy
  basicEffect = effect( ( onCleanup ) => {
    // Este efecto basico se va a disparar tan pronto el componente es inicializado
    // No se aconseja disparar peticiones HTTP en efectos porque es muy volatil (Para esto es mejor usar el Resources o RxResources)
    log(
      'effect',
      'Disparar efectos secundarios'
    );

    onCleanup(() => {
      log(
        'onCleanup',
        'Se ejecuta cuando el efecto se va a destruir'
      );
    });
  });

  // Nos creamos metodos para cada uno de los componentes del ciclo de vida del componente
  // Con que pongamos su respectivo nombre va a llamar el ciclo de vida, no hace alta usar un immplements en la clase
  // Aqui el orden en el que veamos los Console.logs es como se llama el ciclo de vida en el momento que el componente es construido
  ngOnInit(){
    // Este es usado cuando queremos hacer peticiones HTTP porque el componente ya esta listo para ser usado
    log(
      'ngOnInit',
      'Runs once after Angular has initialized all the components inputs.'
    );
  }

  ngOnChanges(){
    // Este se dispara cuando cambia una Signal de entrada
    log(
      'ngOnChanges',
      'Runs every time the components inputs have changed.'
    );
  }

  ngDoCheck(){
    // Este se ejecuta cada vez que algo cambio en el componente, como una propiedad (Esto funciona tanto Zoonless como el Angular tradicional)
    log(
      'ngDoCheck',
      'Runs every time this component is checked for changes.'
    );
  }

  ngAfterContentInit(){
    // Este se ejecuta despues que el componente es inicializado
    log(
      'ngAfterContentInit',
      'Runs once after the components content has been initialized.'
    );
  }

  ngAfterContentChecked(){
    log(
      'ngAfterContentChecked',
      'Runs every time this component content has been checked for changes.'
    );
  }

  ngAfterViewInit(){
    log(
      'ngAfterViewInit',
      'Runs once after the components view has been initialized.'
    );
  }

  ngAfterViewChecked(){
    log(
      'ngAfterViewChecked',
      'Runs every time the components view has been checked for changes.'
    );
  }

  // Este era muy usado antes (Se llama cada vez que el componente es destruido)
  ngOnDestroy(){
    // Aqui era donde se hace limpieza de timers, intervalos de tiempo, cancelar suscripciones
    log(
      'ngOnDestroy',
      'Runs once before the component is destroyed',
    );
  }

  // Estos que no empiezan con "ng" siginifica que son funciones
  afterNextRenderEffect = afterNextRender(() => {
    // Este se ejecuta despues que todos los componentes de ciclo de vida se ejecutan
    log(
      'afterNextRender',
      'Runs once the next time that all components have been rendered to the DOM.'
    );
  });

  afterRenderEffect = afterRender(() => {
    // Esto sucede despues que todo se renderizo
    log(
      'afterRender',
      'Runs every time all components have been rendered to the DOM.'
    );
  });

  // Es importante saber que parte del ciclo de vida de los componentes se va a volver a llamar
  // cuando hacemos click en la misma opcion del menu volvemos a llamar el componte y ejecutar los componentes de ciclo de vida
  // a pesar de que no hay ningun cambio (Es importante saber cuales se mandan a llamar asi, porque si creamos suscripciones en alguno
  // entonces vamos a estar acumulando suscripciones)
}
