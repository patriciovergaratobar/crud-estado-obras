export interface Usuario {

    rut: string;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    tipoPerfil:  string;
    activo: number;
    token: string;
    empresaId: number;
    nombreEmpresa: string;
}
