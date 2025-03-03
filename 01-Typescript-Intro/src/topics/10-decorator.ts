// Un decorador es como una simple funcion que se puede poner en muchos lugares como para ampliar las
// funcionalidades de la clase, propiedades, metodos empezando el nombre con @
// Esto es un tipo de dato Geenrico el cual extiende que con new y el operador REST unimos todos los argumento que se almacenaraan en un Array y no se que mas
function classDecorator<T extends { new (...args: any[]): {}}>(
    // Para que sea un decorador de clase tenemos que recibir un constructor como argumento
    constructor: T
){
    // La clase tendra ahora estas propeidades agregadas solo porque se le ponga el decorador
    return class extends constructor {
        newProperty = 'New Property';
        hello = 'override';
    }
}

// En angular el 99% de lo que se hacen son clases que cambian su comportamiento segun el decorador que tengan
// gracias a los decoradores evitamos agregarle logica extra a las clases o hacerlas mas complejas para solo mandar a llamar
// el decorador y que le agrege esa nueva funcionalidad
@classDecorator
export class SuperClass {

    public myProperty: string = 'Abc123';

    // Esto es un metodo
    print(){
        console.log('Hola mundo');
    }
}

// Impimimos la definicion de la clase
console.log( SuperClass );

// Esta es la instancia
const myClass = new SuperClass();
console.log(myClass);