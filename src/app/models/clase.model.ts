import { Registro } from "./registro.model";

export interface Clase {
    id?: number;         
    nombre: string;
    registros: Registro[];
  }