
export class Person {
    // Creacion de propiedades (ASi queremos que sean opcionales solo le ponemos el simbolo de ? despues del nombre)
    /*public name: string;
    public address: string;
    // Las que son de tipo "Private" solo se pueden usar dentro de la clase

    // Igual aqui si le ponemos el simbolo de ? es que puede ser opcional
    constructor(name: string, address: string){
        this.name = name;
        this.address = address;
    }*/

    // Asi es la forma mas comun de crear las propiedades
    // Automaticamente crear las propiedades y les asigna sus valores
    constructor(
        public name: string,
        public address: string = 'No address' // Asignacion de valores por defectos
    ){}
    // Este es el inicio de la inyeccion de dependencias donde le pasamos una clase al constructor que angula va a detectar y 
    // automaticamente no inyecta una instancia de esa clase
}

// Creamos otra clase que tendra la herencia de la clase Person
export class Hero extends Person{
    // Esta clase tendra logica propia pero tambien va a tener los metodos y propieadades de la clase Person
    // Al defenir el constructor estamos obligados a defenirle el SUPER
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
    ){
        // Asi llamamos el constructor del Padre y le tenemos que mandar los valores que tiene la clase
        super(realName, 'New York');
    }
}

// Al poner el cursor encima de este objeto veremos que el tipo de Dato es "Person" como si fuera una interfaz
const ironman = new Person('Jose','Real 012');

const ironman2 = new Hero('Ironman',45,'Tona');

console.log(ironman, ironman2);

// Priorizar la Composicion sobre Herencia
// Si tenemos una clase que tiene la herencia de muchas otras clases, lo mejor para evitar eso es
// tener la instancia dentro de la clase y evitar llamar SUPER
// Esta clase requeire los datos de PERSON para funcionar, nosotros queremos evitar tener herencia
export class Hero2{ //extends Person{ -> Asi que comentamos esa linea
    
    // Creamos una propiedad del tipo de la clase
    // public person: Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person // Para solucionar lo que si se modifica la clase Person esta clase se vea afectada
    ){
        // Aqui inicializamos el objeto porque asi lo queremos para este ejemplo
        // aqui tendremos la informacion de la clase 
        //      this.person = new Person(realName);
        // El incoveniendte es que tenemos una dependencia en la cual si la clase PERSON cambiara en su constructor
        // esta clase de HERO estaria Afectada, asi que para ese caso en lugar de crear la instancia aqui implementamos lo 
        // que esta arriba en las propiedades dentro del constructor
    }
}

// Asi que creamos la instancia aqui afuera y se lo pasamos al constructor de la calse
const tony = new Person('Tony Start','New York');// Asi si cambia Person solo le afecta esta variable y se mantiene la relacion con la clase HERO
// Para muchos casos esta instancia puede ser reutilizada para otras clases que la requieran y asi nos evitamos agreagrle el EXTENDS

const ironmen = new Hero2('Ironman',45,'Tony', tony );

console.log(ironmen);
