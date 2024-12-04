import Venta from "../models/ventas";
import VentaDetalle from "../models/ventaDetalle";
import Inventario from "../models/inventario";
import db from "../db/connection";
import { VentaAttributes } from "../interfaces/ventaInterfaz";
import { VentaDetalleAttributes } from "../interfaces/ventaDetalleInterfaz";
// ...otras importaciones necesarias...

// Función para insertar una nueva venta con tipos actualizados
export const insertarVenta = async (
  id_cliente: number,
  id_usuario?: number
): Promise<Venta> => {
  try {
    const nuevaVenta = await Venta.create({
      id_cliente: id_cliente || 1,
      id_usuario: id_usuario || 1, // Si id_usuario es undefined, usa 1
      monto_final: 0, // Requerido por la interfaz
      // id_venta es autoincremental, no necesita ser proporcionado
    });
    return nuevaVenta;
  } catch (error: any) {
    // Log del error para debugging
    console.error("Error al crear la venta:", error);
    throw new Error(
      `Error al crear la venta: ${error.message || "Error desconocido"}`
    );
  }
};

// Función para insertar detalles de la venta y actualizar el inventario con transacciones
/**
 * Inserta los detalles de una venta en la base de datos y actualiza el inventario correspondiente
 * @param idVenta - ID de la venta a la que se asociarán los detalles
 * @param detalles - Array de detalles de venta que contiene información de productos y cantidades
 * @returns Promise que resuelve a true si la operación fue exitosa
 * @throws Error si ocurre algún problema durante la inserción o actualización
 *
 * @example
 * const detalles = [{
 *   id_producto_inventario: 1,
 *   precio: 10.99,
 *   cantidad: 2
 * }];
 * await insertarDetallesVenta(1, detalles);
 */
export const insertarDetallesVenta = async (
  idVenta: number,
  detalles: VentaDetalleAttributes[]
) => {
  const transaction = await db.transaction();
  let montoFinal = 0;
  try {
    for (const detalle of detalles) {
      // Validar existencia de producto y stock suficiente
      const producto = await Inventario.findByPk(
        detalle.id_producto_inventario,
        {
          transaction,
        }
      );

      if (!producto) {
        throw new Error(
          `Producto con ID ${detalle.id_producto_inventario} no encontrado`
        );
      }

      if (producto.stock < detalle.cantidad) {
        throw new Error(
          `Stock insuficiente para el producto ID ${detalle.id_producto_inventario}`
        );
      }

      // Calcular el monto total del detalle
      const montoTotalDetalle = detalle.precio * detalle.cantidad;

      // Insertar detalle de venta
      await VentaDetalle.create(
        {
          id_venta: idVenta,
          id_producto_inventario: detalle.id_producto_inventario,
          precio: detalle.precio,
          cantidad: detalle.cantidad,
          monto_total: detalle.precio * detalle.cantidad,
        },
        { transaction }
      );

      // Actualizar inventario
      producto.stock -= detalle.cantidad;
      await producto.save({ transaction });
      // Acumular el monto total
      montoFinal += montoTotalDetalle;
    }

    // Actualizar el monto_final en la tabla de ventas
    const venta = await Venta.findByPk(idVenta, { transaction });
    if (!venta) {
      throw new Error(`Venta con ID ${idVenta} no encontrada`);
    }
    venta.monto_final = montoFinal;
    await venta.save({ transaction });
    // Confirmar transacción
    await transaction.commit();
    return true;
  } catch (error) {
    // Revertir transacción en caso de error
    await transaction.rollback();
    throw error;
  }
};
