// Array que solo acepta valores de tipo String
// Las constantes son mas ligeras que la variables LET porque no tienen metodos de asignacion
const skills: string[] = ['Bash','Counter','Healing'];

// Definir tipo de dato para el objeto
interface Character{
    name: string,
    hp: number,
    skills: string[],
    hometown?: string, // Esta propiedad es opcional
}

const strider: Character = {
    name: 'Strinder',
    hp: 100,
    skills
}

// Despues le asignamos valor a la propiedad que es opcional
strider.hometown = 'Rivendell';

console.table(strider);

export {};