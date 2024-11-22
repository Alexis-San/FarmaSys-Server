export interface InventarioAttributes {
  id: number;
  precio_venta: number;
  precio_compra: number;
  descripcion?: string;
  fecha_vencimiento?: Date;
  stock: number;
  lote?: string;
  estado: boolean;
  productoId: number;
}
