

const name = 'Perro';

// Variable que acepta dos tipos de datos
let hpPoints: number | string = 95;

// Tambien le podemos decir que sera de numero o para que no sea cualquier String solo acepte la palabra
// literal de FULL
let hpPoints2: number | 'FULL' = 95;

hpPoints = "FULL";

const isAlive: boolean = true;

console.log({
    name,
    hpPoints2,
    isAlive
})


export {}; // Le indicamos que es un modulo para evitar errores lexicos