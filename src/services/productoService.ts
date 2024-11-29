import Producto from "../models/producto";
import { ProductoAttributes } from "../interfaces/productoInterfaz";
export const obtenerProductos = async () => {
  try {
    return await Producto.findAll({
      where: { estado: true },
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
    });
  } catch (error) {
    throw new Error("Error al obtener los productos: " + error);
  }
};

export const obtenerProductoPorId = async (id: string) => {
  try {
    return await Producto.findOne({
      where: {
        id,
        estado: true,
      },
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
    });
  } catch (error) {
    throw new Error(`Error al obtener el producto con id ${id}: ${error}`);
  }
};

export const crearProducto = async (body: any) => {
  try {
    const existeProducto = await Producto.findOne({
      where: {
        nombre_comercial: body.nombre_comercial,
        estado: true,
      },
    });

    if (existeProducto) {
      throw new Error(
        `Ya existe un producto con el nombre comercial ${body.nombre_comercial}`
      );
    }

    return await Producto.create({ ...body, estado: true });
  } catch (error) {
    throw new Error("Error al crear el productoo: " + error);
  }
};

export const actualizarProducto = async (id: string, body: any) => {
  try {
    const producto = await Producto.findOne({
      where: {
        id,
        estado: true,
      },
    });
    if (!producto) {
      throw new Error(`No existe un producto con id ${id}`);
    }
    return await producto.update(body);
  } catch (error) {
    throw new Error(`Error al actualizar el producto con id ${id}: ${error}`);
  }
};

export const desactivarProducto = async (id: string) => {
  try {
    const producto = (await Producto.findOne({
      where: {
        id,
        estado: true,
      },
    })) as ProductoAttributes | null;

    if (!producto) {
      throw new Error(`No existe un producto con la id ${id}`);
    }

    const nuevoNombreComercial = `${producto.nombre_comercial}_deleted_${Date.now()}`;
    return await Producto.update(
      {
        estado: false,
        nombre_comercial: nuevoNombreComercial,
      },
      {
        where: { id },
      }
    );
  } catch (error) {
    throw new Error(`Error al eliminar el producto con id ${id}: ${error}`);
  }
};
