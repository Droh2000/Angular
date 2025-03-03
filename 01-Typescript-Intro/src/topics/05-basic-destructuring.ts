// Desestructuracion de Objetos

interface AudioPlayer{
    audioVolumen: number;
    songDuration: number;
    song: string;
    details: Details
}

interface Details{
    author: string,
    year: number,
}

const audioPlayer: AudioPlayer = {
    audioVolumen: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Ed Shitar",
        year: 2015
    }
}

// La desestructuracion conciste en tomar solo ciertas propiedades que nos interesan del objeto
// Si ya tenemos una variable que tiene el mismo nombre que el de la propiedad entonces se tiene que cambiar el nombre de alguno de los dos
const song = 'New Song';

// Asi se cambia la referencia del nombre de la propiedad
const { song:anotherSong, 
        songDuration:duration, 
        // Si queremos desestructurar directamente aqui el Autor se vuelve algo dificil de leer 
        // details: { autor }
        details 
} = audioPlayer;

// Para el caso en el que tenemos el objeto interno, primero desestructuramos los Details y luego de ahi desestructuramos el autor
const { author } = details;

console.log({anotherSong, duration, author});

// Desestructuracion de Arreglos
const dbz: string[] = ['Goku','Calamardo','PowerRanger'];
const trunks = dbz[3] || 'No hay personaje';

// Accedemos a un personaje de una pocicion que no existe asi le indicamosk con el operador OR que en ese caso nos muestre el mensaje
console.error('Personaje 3:', trunks);

// Aplicando la desestructuracion
// Ahora requerimos acceder solo al personaje de la posicion 2 por taanto ponemos las primeras posiciones vacias separadas por comas
// Para asegurarnos en el caso que no exista lo igualamos al valor por defecto
const [ , , trunks2 = 'No encontrado'] = dbz; 

console.log(trunks2);

// El sentido de esto es solo extraer las partes que nos interesa


export {};