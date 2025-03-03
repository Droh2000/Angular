// Encadenamiento Opcional
export interface Passenger {
    name: string,
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Fernando'
}

const passenger2: Passenger = {
    name: 'Raul',
    children: ['Juan','Luis'],
}

// El encadenamiento opcional lo usamos cuando quermo hacer referencia a un valor
const printChildren = ( passenger: Passenger ) => {

    // Queremos imprimir cuantos hijos tiene pero como esta propeidad es optional tenemos que verificar
    // SI EXISTE entonces que ejecute la funcion que sigue, si no existe nos dara undefined
    // Para poner la logica en el caso de que sea undefinde nos regrese CERO solo agregamos OR con || para que ejecute el codigo 
    // en caso que sea undefined o null
    const howManyChildren = passenger.children?.length || 0;

    console.log(passenger.name, howManyChildren);
}

// Para el caso en el que queremos que siempre nos regrese numero no sea (number | undefined) porque estamos seguros de eso
const returnChildrenNumber = ( passenger: Passenger ): number => {
    // Tenemos que verificar primero si esa propiedad viene undefined
    // Si no existe nos retorne cero
    if( !passenger.children ) return 0;
    
    // Aqui en lugar de ? le colocamos ! para decirle a TS que siempre tendra un valor ahi 
    const howManyChildren = passenger.children!.length;

    return howManyChildren;
}

printChildren(passenger2)
printChildren(passenger1);