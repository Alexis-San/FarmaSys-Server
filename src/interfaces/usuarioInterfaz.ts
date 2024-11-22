export interface UsuarioAttributes {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    estado: boolean;
}