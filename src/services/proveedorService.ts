import Proveedor from "../models/proveedor";
import { ProveedorAttributes } from "../interfaces/proveedorInterfaz";
export const obtenerProveedores = async () => {
  try {
    return await Proveedor.findAll({
      attributes: ["id", "nombre", "descripcion", "telefono"],
      where: { estado: true },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error al obtener los proveedores: " + error.message);
    }
    throw error;
  }
};

export const obtenerProveedorPorId = async (id: string) => {
  try {
    return await Proveedor.findOne({
      attributes: ["id", "nombre", "descripcion", "telefono"],
      where: {
        id,
        estado: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error al obtener el proveedor con id ${id}: ${error.message}`
      );
    }
    throw error;
  }
};

export const crearProveedor = async (body: any) => {
  try {
    // Convertir el nombre a mayúsculas
    const nombreMayusculas = body.nombre.toUpperCase();

    const existeNombre = await Proveedor.findOne({
      where: {
        nombre: nombreMayusculas,
        estado: true,
      },
    });

    if (existeNombre) {
      throw new Error(`Ya existe un proveedor con el nombre ${body.nombre}`);
    }

    // Crear el proveedor con el nombre en mayúsculas
    return await Proveedor.create({
      ...body,
      nombre: nombreMayusculas,
      estado: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error al crear el proveedor: " + error.message);
    }
    throw error;
  }
};

export const actualizarProveedor = async (id: string, body: any) => {
  try {
    const proveedor = await Proveedor.findOne({
      where: {
        id,
        estado: true,
      },
    });
    if (!proveedor) {
      throw new Error(`No existe un proveedor con id ${id}`);
    }
    return await proveedor.update(body);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error al actualizar el proveedor con id ${id}: ${error.message}`
      );
    }
    throw error;
  }
};

export const desactivarProveedor = async (id: string) => {
  try {
    const proveedor = (await Proveedor.findOne({
      where: {
        id,
        estado: true,
      },
    })) as ProveedorAttributes | null;

    if (!proveedor) {
      throw new Error(`No existe un proveedor con la id ${id}`);
    }

    const nuevoNombre = `${proveedor.nombre}_deleted_${Date.now()}`;
    return await Proveedor.update(
      {
        estado: false,
        nombre: nuevoNombre,
      },
      {
        where: { id },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error al desactivar el proveedor con id ${id}: ${error.message}`
      );
    }
    throw error;
  }
};
