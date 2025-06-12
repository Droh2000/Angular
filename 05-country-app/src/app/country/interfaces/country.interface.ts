// Creamos nuestra propia interfaces porque si en el futuro cambia el nombre de las propiedaes
// de la API no tenemos que cambiar toda la base del codigo porque aqui solo vamos a definir las
// propiedades que nesecitamos y con el estandar en nombre que queramos
export interface Country{
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
}

