// Funcion en la cual no sabemos el tipo de dato hasta que esta la empezemos utilizar 
// o que realiza una accion dependiendo del argumento que recibe por su tipo de dato (No usar ANY)
// Esto lo hacemos mediante los Genericos donde despues dle nombre de la funcion va <NOMBRE_DEL_TIPO>
// Aqui la funcion es generica ese tipo es del mismo que el del argumento y sera el mismo que el retorno de la funcion
export function whatsMyType<T>( arg: T ): T{
    return arg;
}
// Asi acepta cualquier tipo y TS lo infiere, al usar la funcion y no especificarle el tipo entre <> TS lo infiere el string como el literal
// pero igual se lo podemos especificar <> para que tome el tipo de dato y no el valor que le almacenamos
// ademas nos aseguramos que al usar la funcion solo se pueda con ese tipo entre <> y no acepte ningun otro
const amIstring = whatsMyType<string>('Hola Mundo');
const amInumber = whatsMyType<number>(100);
const amIarray = whatsMyType<number[]>([1,2,3,4,5,6,7,8,9]);
// Si fuera ANY la funcion no tendriamos ningun metodo de autoayuda para aplicarle los metodos segun el tipo en este caso String
// Los metodos si los podemos usar pero no tenemos acceso rapido para usarlos
// Gracias a los genericos tenemos todos los metodos correspondientes al tipo de dato
console.log(amIstring.toLowerCase());
console.log(amInumber.toFixed(2));
console.log(amIarray.join('-'));
