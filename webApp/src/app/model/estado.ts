import { Archivo } from "./archivo";
import { Comentario } from "./comentario";

export interface Estado {

    estadosObrasId: number;
    titulo: string;
    comentario: string;
    fecha: Date;
    obraId: number;
    nombreObra: string;

    nombreProyecto: string;
    nombreEmpresa: string;

    fotos: Array<Archivo>;

    comentariosEstado: Array<Comentario>;
}