import { Request, Response } from "express";
import { insertarVenta, insertarDetallesVenta } from "../services/VentaService";
import { VentaDetalleAttributes } from "../interfaces/ventaDetalleInterfaz";

export const crearVenta = async (req: Request, res: Response) => {
  try {
    const { id_cliente, id_usuario } = req.body;
    const nuevaVenta = await insertarVenta(id_cliente, id_usuario);

    res.status(201).json({
      //msg: "Venta creada exitosamente",
      venta: nuevaVenta,
    });
  } catch (error) {
    console.error("Error al crear la venta:", error);
    res.status(500).json({
      msg: "Error al crear la venta",
      error: (error as Error).message,
    });
  }
};

export const agregarDetallesVenta = async (req: Request, res: Response) => {
  try {
    const { id_venta, detalles } = req.body;
    await insertarDetallesVenta(id_venta, detalles);

    res.status(201).json({
      msg: "Detalles de venta agregados exitosamente",
      detalles: detalles,
    });
  } catch (error) {
    console.error("Error al agregar detalles de venta:", error);
    res.status(500).json({
      msg: "Error al agregar detalles de venta",
      error: (error as Error).message,
    });
  }
};
