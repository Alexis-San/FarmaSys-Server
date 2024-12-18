import { Transaction, Model, Op, WhereOptions } from "sequelize";
import db from "../db/connection";
import inventario from "../models/inventario";
import Producto from "../models/producto";
import { InventarioAttributes } from "../interfaces/inventarioInterfaz";
import { ProductoAttributes } from "../interfaces/productoInterfaz";

export const obtenerInventarios = async () => {
  try {
    const whereClause = {
      estado: true,
      stock: {
        [Op.gt]: 0,
      },
      productoId: {
        [Op.not]: null,
      },
    } as WhereOptions<InventarioAttributes>;

    return await inventario.findAll({
      attributes: [
        "id",
        "precio_venta",
        "precio_compra",
        "descripcion",
        "fecha_vencimiento",
        "stock",
        "lote",
        "estado",
        "productoId",
      ],
      where: whereClause,
      include: [
        {
          model: Producto,
          as: "producto",
          attributes: [
            "id",
            "nombre_comercial",
            "presentacion",
            "descripcion",
            "precio_venta",
            "condicion_venta",
          ],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error al obtener inventarios: ${error}`);
  }
};

export async function obtenerInventarioConProductos(busqueda: string) {
  const conditions = [];

  // Manejo de campos numéricos
  const numericValue = !isNaN(Number(busqueda)) ? Number(busqueda) : null;
  if (numericValue !== null) {
    conditions.push({ precio_compra: numericValue }, { stock: numericValue });
  }

  // Manejo de campos de texto y fecha
  conditions.push(
    { fecha_vencimiento: { [Op.like]: `%${busqueda}%` } },
    { lote: { [Op.like]: `%${busqueda}%` } },
    { "$producto.nombre_comercial$": { [Op.like]: `%${busqueda}%` } },
    { "$producto.codigo_cafapar$": { [Op.like]: `%${busqueda}%` } },
    { "$producto.presentacion$": { [Op.like]: `%${busqueda}%` } }
  );

  return await inventario.findAll({
    attributes: [
      "id",
      "precio_venta",
      "precio_compra",
      "descripcion",
      "fecha_vencimiento",
      "stock",
      "lote",
      "estado",
      "productoId",
    ],
    where: {
      estado: true,
      [Op.or]: conditions,
    },
    include: [
      {
        model: Producto,
        attributes: [
          "id",
          "codigo_cafapar",
          "nombre_comercial",
          "presentacion",
          "descripcion",
          "precio_venta",
          "condicion_venta",
          "procedencia",
          "laboratorioId",
        ],
      },
    ],
  });
}

export const obtenerInventarioPorId = async (id: string) => {
  try {
    return await inventario.findOne({
      attributes: [
        "id",
        "precio_venta",
        "precio_compra",
        "descripcion",
        "fecha_vencimiento",
        "stock",
        "lote",
        "productoId",
      ],
      where: { id, estado: true },
      include: ["producto"],
    });
  } catch (error) {
    throw new Error(`Error al obtener el inventario ${id}: ${error}`);
  }
};

export const crearInventario = async (body: InventarioAttributes) => {
  try {
    const nuevoInventario = await inventario.create({
      ...body,
      estado: true,
    });
    return nuevoInventario;
  } catch (error) {
    throw new Error("Error al crear el inventario: " + error);
  }
};

export const crearProductoInventario = async (body: any) => {
  const t: Transaction = await db.transaction();

  try {
    let productoId = body.productoId;

    if (!productoId) {
      const nuevoProducto = (await Producto.create(
        {
          nombre_comercial: body.nombre_comercial,
          presentacion: body.presentacion,
          precio_venta: body.precio_venta,
          condicion_venta: body.condicion_venta || "VENTA LIBRE",
          estado: true,
        },
        { transaction: t }
      )) as Model<ProductoAttributes> & ProductoAttributes;

      productoId = nuevoProducto.id;
    }
    // Crear inventario
    const nuevoInventario = await inventario.create(
      {
        ...body,
        productoId,
        estado: true,
      },
      { transaction: t }
    );

    await t.commit();
    return nuevoInventario;
  } catch (error) {
    await t.rollback();
    throw new Error("Error al crear inventario: " + error);
  }
};

export const actualizarInventario = async (id: string, body: any) => {
  try {
    const inventarioExistente = await inventario.findOne({
      where: { id, estado: true },
    });

    if (!inventarioExistente) {
      throw new Error(`No existe inventario con id ${id}`);
    }

    return await inventarioExistente.update(body);
  } catch (error) {
    throw new Error(`Error al actualizar inventario ${id}: ${error}`);
  }
};

export const desactivarInventario = async (id: string) => {
  try {
    const resultado = await inventario.update(
      { estado: false },
      { where: { id, estado: true } }
    );

    if (resultado[0] === 0) {
      throw new Error(`No existe inventario con id ${id}`);
    }

    return resultado;
  } catch (error) {
    throw new Error(`Error al desactivar inventario ${id}: ${error}`);
  }
};
