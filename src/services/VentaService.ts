import Venta from "../models/ventas";
import VentaDetalle from "../models/ventaDetalle";
import Cliente from "../models/cliente";
import Usuario from "../models/usuario";
import { VentaAttributes } from "../interfaces/ventaInterfaz";
import { VentaDetalleAttributes } from "../interfaces/ventaDetalleInterfaz";
import db from "../db/connection";

export const hacerVenta = async (items: VentaDetalleAttributes[]) => {
  const transaction = await db.transaction();
  try {
    const nuevaVenta = await Venta.create(
      {
        id_cliente: null,
        id_usuario: null,
        descuento: 0,
        monto_final: 0,
      },
      { transaction }
    );

    let monto_final = 0;

    for (const item of items) {
      const ventaDetalle = await VentaDetalle.create(
        {
          id_venta: (nuevaVenta as any).id_venta, // Aplicando 'as any' aquí
          id_producto_inventario: item.id_producto_inventario,
          precio: item.precio,
          cantidad: item.cantidad,
          monto_total: item.precio * item.cantidad,
        },
        { transaction }
      );
      monto_final += (ventaDetalle as any).monto_total; // Y aquí también
    }

    await nuevaVenta.update({ monto_final }, { transaction });

    await transaction.commit();
    return nuevaVenta;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
