import Venta from "../models/ventas";
import VentaDetalle from "../models/ventaDetalle";
import { VentaDetalleAttributes } from "../interfaces/ventaDetalleInterfaz";
import { VentaAttributes } from "../interfaces/ventaInterfaz";
import db from "../db/connection";
import { LoginAttributes } from "../interfaces/loginInterface";
import { obtenerUsuarioLogeado } from "./loginService";

export const hacerVenta = async (
  items: VentaDetalleAttributes[],
  id_cliente?: number
) => {
  const transaction = await db.transaction();
  try {
    const usuarioLogeado: LoginAttributes = await obtenerUsuarioLogeado();
    const clienteId = id_cliente || 1;

    const nuevaVenta = await Venta.create(
      {
        id_cliente: clienteId,
        id_usuario: usuarioLogeado.id,
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
