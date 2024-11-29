export interface VentaAttributes {
  id_venta?: number;
  id_cliente?: number;
  id_usuario?: number;
  descuento?: number;
  monto_final: number;
  createdAt?: Date;
  updatedAt?: Date;
}
