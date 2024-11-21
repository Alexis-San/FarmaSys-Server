import Actuador from "../models/actuador";
import { ActuadorAttributes } from "../interfaces/actuadorInterfaz";
export const obtenerActuadores = async () => {
  try {
    // Solo retorna actuadores activos (estado = true)
    return await Actuador.findAll({
      where: { estado: true },
    });
  } catch (error) {
    throw new Error("Error al obtener los actuadores: " + error);
  }
};

export const obtenerActuadorPorId = async (id: string) => {
  try {
    return await Actuador.findOne({
      where: {
        id,
        estado: true,
      },
    });
  } catch (error) {
    throw new Error(`Error al obtener el actuador con id ${id}: ${error}`);
  }
};

export const crearActuador = async (body: any) => {
  try {
    const existeNombre = await Actuador.findOne({
      where: {
        nombre: body.nombre,
        estado: true,
      },
    });

    if (existeNombre) {
      throw new Error(`Ya existe un actuador con el nombre ${body.nombre}`);
    }

    return await Actuador.create({ ...body, estado: true });
  } catch (error) {
    throw new Error("Error al crear el actuador: " + error);
  }
};

export const actualizarActuador = async (id: string, body: any) => {
  try {
    const actuador = await Actuador.findOne({
      where: {
        id,
        estado: true,
      },
    });
    if (!actuador) {
      throw new Error(`No existe un actuador con id ${id}`);
    }
    return await actuador.update(body);
  } catch (error) {
    throw new Error(`Error al actualizar el actuador con id ${id}: ${error}`);
  }
};

export const desactivarActuador = async (id: string) => {
  try {
    const actuador = (await Actuador.findOne({
      where: {
        id,
        estado: true,
      },
    })) as ActuadorAttributes | null;

    if (!actuador) {
      throw new Error(`No existe un actuador con la id ${id}`);
    }

    const nuevoNombre = `${actuador.nombre}_deleted_${Date.now()}`;
    return await Actuador.update(
      {
        estado: false,
        nombre: nuevoNombre,
      },
      {
        where: { id },
      }
    );
  } catch (error) {
    throw new Error(`Error al desactivar el actuador con id ${id}: ${error}`);
  }
};
