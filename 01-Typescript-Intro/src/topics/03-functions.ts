// Al poner el cursor veremos que nos dice que regresa VOID aunque sabiendo en JS sabemos que 
// siempre se regresa undefined (No es lo mismo El void a udefined), cuando es VOID es porque no tenemos
// return en la funcion
function addNumbers(a: number, b:number){
    return a + b;
}
// El tipado lo tenemos estricto en todo momento y TS infiere el tipo de dato aunque no se lo pasemos
const result: number = addNumbers(1,2);

// Luego de los parentesis le definimos el tipo de dato que va a retornar
const addNUmbersArrow = (a: number, b: number):string => `${a + b}`;
const result2:string = addNUmbersArrow(1,2); 

// Argumentos Opcionales y Obligatorios
// Con el simbolo ? es opcional, el tercer argumento es opcional pero tambien tiene valores por defecto
function multiply( firstNumber: number, secondNumber?: number, base: number = 2 ){
    return firstNumber * base;
}
const multiplyResult: number = multiply(5);

console.log(result, result2, multiplyResult);

// Funciones con objetos como argumentos

interface Character{
    name: string;
    hp: number;
    // Asi se definen las propiedades de tipo funcion (Despues de la felcha es el valor de retorno)
    showHp: () => void
}

// Con el tipo "Chracter" le decimos que solo puede reicibir objetos que se miren de esa manera osea que contenga esas propiedades
const healCharacter = ( character: Character, amount: number ) => {

    // Aqui le estamos sumando puntos de vida
    character.hp += amount;
}

// Definimos el objeto
const Stride: Character = {
    name: 'Strider',
    hp: 50,
    showHp(){
        // Con thi accedemos a la propiedad del objeto
        console.log(`Puntos de Vida: ${this.hp}`);
    }
}

healCharacter(Stride, 10); // Curamos al personaje
Stride.showHp(); // Imprimimos los datos

export {};