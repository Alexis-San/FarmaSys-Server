import Laboratorio from "../models/laboratorio";
import { LaboratorioAttributes } from "../interfaces/laboratorioInterfaz";

export const obtenerLaboratorios = async () => {
  try {
    return await Laboratorio.findAll({
      where: { estado: true },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error al obtener los laboratorios: " + error.message);
    }
    throw error;
  }
};

export const obtenerLaboratorioPorId = async (id: string) => {
  try {
    return await Laboratorio.findOne({
      where: {
        id,
        estado: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error al obtener el laboratorio con id ${id}: ${error.message}`
      );
    }
    throw error;
  }
};

export const crearLaboratorio = async (body: any) => {
  try {
    const existeNombre = await Laboratorio.findOne({
      where: {
        nombre: body.nombre,
        estado: true,
      },
    });

    if (existeNombre) {
      throw new Error(`Ya existe un laboratorio con el nombre ${body.nombre}`);
    }

    return await Laboratorio.create({ ...body, estado: true });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error al crear el laboratorio: " + error.message);
    }
    throw error;
  }
};

export const actualizarLaboratorio = async (id: string, body: any) => {
  try {
    const laboratorio = await Laboratorio.findOne({
      where: {
        id,
        estado: true,
      },
    });
    if (!laboratorio) {
      throw new Error(`No existe un laboratorio con id ${id}`);
    }
    return await laboratorio.update(body);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error al actualizar el laboratorio con id ${id}: ${error.message}`
      );
    }
    throw error;
  }
};

export const desactivarLaboratorio = async (id: string) => {
  try {
    const laboratorio = (await Laboratorio.findOne({
      where: {
        id,
        estado: true,
      },
    })) as LaboratorioAttributes | null;

    if (!laboratorio) {
      throw new Error(`No existe un laboratorio con la id ${id}`);
    }

    const nuevoNombre = `${laboratorio.nombre}_deleted_${Date.now()}`;
    return await Laboratorio.update(
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
        `Error al desactivar el laboratorio con id ${id}: ${error.message}`
      );
    }
    throw error;
  }
};
