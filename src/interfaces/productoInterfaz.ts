export interface ProductoAttributes {
  id: number;
  codigo_cafapar?: number;
  nombre_comercial: string;
  presentacion: string;
  descripcion?: string;
  precio_venta: number;
  condicion_venta: "BAJO RECETA" | "VENTA LIBRE";
  procedencia?: "NACIONAL" | "IMPORTADO";
  estado: boolean;
  laboratorioId?: number;
}
