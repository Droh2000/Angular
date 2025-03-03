// Desestructuracion de Argumentos
export interface Product {
    description: string,
    price: number,
}

const phone: Product = {
    description: 'Nokia A1',
    price: 150.99
}

const tablet: Product = {
    description: 'iPad Air',
    price: 250.99,
}

// Cuando tenemos una funcion que va a recibir mas de tres argumentos se aconseja que segun el CLEAN CODE
// que tengamos maximo 3 y de ahi ssi hay mas transformemos los argumentos en un objeto
// En este caso esta funcion recibira una cantidad de argumentos que pueden crecer en el futuro
// como es un objeto personalizado nos creamos una interface
interface TaxCalculationOptions{
    tax: number;
    products: Product[];
}

// Las lineas comentadas son de la aplicacion sin desestructuracion
// function taxCalculation( options: TaxCalculationOptions ): number[]{

// Aqui cambiamos el arreglo por una Tupla porque siempre nos va a regresar eso la funcion
export function taxCalculation( { tax, products }: TaxCalculationOptions ): [number, number]{
    let total = 0;

    // Otro camino era dejar el argumento "options" y desestructurarlo aqui para el caso que tengamos muchas propeidades
    // const { tax, products } = options;

    // Recorremos todos los productos para sacar el total
    /*options.products.forEach( product => {
        total += product.price;
    });

    return [total, total*options.tax];*/

    // Aplicando desestructuracion
    products.forEach( ({ price }) => {
        total += price;
    });

    return [total, total * tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

// USamos la funcion y le definimos sus argumntos que el objeto que es
// const result = taxCalculation({
const [ total, totalTax ] = taxCalculation({
    products: shoppingCart,
    tax,
})

// Como de la varaible resultado es un arreglo solo asi podemos acceder
// console.log('Total', result[0]);
// console.log('tax', result[1]);

console.log('Total', total);
console.log('tax', totalTax);