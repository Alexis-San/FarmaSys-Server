import Venta from "../models/ventas";
import Cliente from "../models/cliente";
import VentaDetalle from "../models/ventaDetalle";
import Inventario from "../models/inventario";
import { Op, Sequelize } from "sequelize";

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
    // Calculate first and last day of current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

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
    console.error("Error al obtener las ventas del mes actual:", error);
    return {
      ok: false,
      msg: "Error al obtener las ventas del mes actual. Por favor, contacte al administrador.",
    };
  }
};

interface VentaTotal extends Venta {
  total: string | number;
}

export const getMontosTresMeses = async () => {
  try {
    const today = new Date();
    const montos = [];

    for (let i = 0; i < 3; i++) {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const lastDay = new Date(
        today.getFullYear(),
        today.getMonth() - i + 1,
        0
      );

      const ventas = (await Venta.findAll({
        where: {
          estado: true,
          monto_final: { [Op.gt]: 0 },
          createdAt: { [Op.between]: [firstDay, lastDay] },
        },
        attributes: [
          [
            Venta.sequelize!.fn("SUM", Venta.sequelize!.col("monto_final")),
            "total",
          ],
        ],
        raw: true,
      })) as VentaTotal[];

      const total = ventas[0]?.total ? Number(ventas[0].total) : 0;

      montos.push({
        mes: firstDay.toLocaleString("default", { month: "long" }),
        total,
      });
    }

    return {
      ok: true,
      montos,
    };
  } catch (error) {
    console.error("Error al obtener montos por mes:", error);
    return {
      ok: false,
      msg: "Error al obtener montos por mes. Por favor, contacte al administrador.",
    };
  }
};

export const getTopProductosVendidos = async () => {
  try {
    const topProductos = await VentaDetalle.findAll({
      attributes: [
        "id_producto_inventario",
        [Sequelize.fn("SUM", Sequelize.col("cantidad")), "total_vendido"],
      ],
      include: [
        {
          model: Inventario,
          as: "Inventario",
          attributes: ["productoid", "precio_venta"],
        },
      ],
      where: {
        estado: true,
      },
      group: ["id_producto_inventario", "Inventario.id"],
      order: [[Sequelize.literal("total_vendido"), "DESC"]],
      limit: 5,
    });

    return {
      ok: true,
      productos: topProductos,
    };
  } catch (error) {
    console.error("Error al obtener los productos más vendidos:", error);
    return {
      ok: false,
      msg: "Error al obtener los productos más vendidos. Por favor, contacte al administrador.",
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
