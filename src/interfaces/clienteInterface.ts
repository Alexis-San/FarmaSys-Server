export interface ClienteAttributes {
  id: number;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  tipo_cliente: string;
  estado: boolean;
}