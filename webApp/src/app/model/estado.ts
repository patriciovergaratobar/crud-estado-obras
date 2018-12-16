import { Archivo } from "./archivo";

export interface Estado {

    estadosObrasId: number;
    titulo: string;
    comentario: string;
    fecha: Date;
    obraId: number;
    nombreObra: string;

    fotos: Array<Archivo>;
}