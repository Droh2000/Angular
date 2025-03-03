// Transformar nuestros archivos en modulos, exponiendo esa pieza a otras zonas del proyecto
import { Product, taxCalculation } from './06-function-desestructuring';

// Aqui reutilizamos una interfaz que ya habiamos creado para ser usada aqui en otra parte
const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 99.99
    },
    {
        description: 'IPad',
        price: 199.99
    }
];

// Reutilizar la funcion para volver a ejecutar el mismo calculo y le pasamos los argumentos
const [ total, tax ] = taxCalculation({
    tax: 0.15, 
    products: shoppingCart
});

console.log({ total, tax });

// Cuando hacemos exportaciones de archivos, el codigo que contengan se ejecutara, en este caso todo el codigo del archivo 06
// asi que al crear modulo hay que tener cuidado de no crear codigo extra que se ejecute al usar el modulo
// y solo tener la parte que se va a exportar 
