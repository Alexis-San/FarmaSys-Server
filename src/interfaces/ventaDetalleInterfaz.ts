export interface VentaDetalleAttributes {
  id?: number;
  id_venta: number;
  id_producto_inventario: number;
  precio: number;
  cantidad: number;
  createdAt?: Date;
  updatedAt?: Date;
}
