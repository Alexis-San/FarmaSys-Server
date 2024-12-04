import Venta from "../models/ventas";
import Cliente from "../models/cliente";
import { Op } from "sequelize";

export const obtenerTodasLasVentasVentas = async () => {
  try {
    const ventas = await Venta.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "ci"],
        },
      ],
      where: {
        estado: true,
        monto_final: {
          [Op.gt]: 0,
        },
      },
    });

    return {
      ok: true,
      ventas,
    };
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    return {
      ok: false,
      msg: "Error al obtener las ventas. Por favor, contacte al administrador.",
    };
  }
};

export const getVentasUltimoMes = async () => {
  try {
    // Calculate first and last day of previous month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);

    const ventas = await Venta.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "ci"],
        },
      ],
      where: {
        estado: true,
        monto_final: {
          [Op.gt]: 0,
        },
        createdAt: {
          [Op.between]: [firstDay, lastDay],
        },
      },
    });

    return {
      ok: true,
      ventas,
    };
  } catch (error) {
    console.error("Error al obtener las ventas del último mes:", error);
    return {
      ok: false,
      msg: "Error al obtener las ventas del último mes. Por favor, contacte al administrador.",
    };
  }
};

export const getHistorialVentasCliente = async (clienteId: number) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellido", "ci"],
        },
      ],
      where: {
        estado: true,
        id_cliente: clienteId,
        monto_final: {
          [Op.gt]: 0,
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return {
      ok: true,
      ventas,
    };
  } catch (error) {
    console.error(
      `Error al obtener el historial de ventas del cliente ${clienteId}:`,
      error
    );
    return {
      ok: false,
      msg: "Error al obtener el historial de ventas. Por favor, contacte al administrador.",
    };
  }
};

export const filtrarVentasPorCliente = async (busqueda: string | number) => {
  try {
    const whereClause: any = {
      estado: true,
      monto_final: {
        [Op.gt]: 0,
      },
    };

    const includeClause = {
      model: Cliente,
      attributes: ["nombre", "apellido", "ci"],
      where:
        typeof busqueda === "string"
          ? {
              [Op.or]: [
                { nombre: { [Op.iLike]: `%${busqueda}%` } },
                { apellido: { [Op.iLike]: `%${busqueda}%` } },
              ],
            }
          : undefined,
    };

    if (typeof busqueda === "number") {
      whereClause.id_cliente = busqueda;
    }

    const ventas = await Venta.findAll({
      include: [includeClause],
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return {
      ok: true,
      ventas,
    };
  } catch (error) {
    console.error("Error al filtrar las ventas:", error);
    return {
      ok: false,
      msg: "Error al filtrar las ventas. Por favor, contacte al administrador.",
    };
  }
};
