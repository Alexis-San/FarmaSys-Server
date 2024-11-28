import Categoria from "../models/categoria";
import { CategoriaAttributes } from "../interfaces/categoriasInterfaz";
export const obtenerCategorias = async () => {
  try {
    // Solo retorna categorias activas (estado = true) con los campos id, nombre, descripcion
    return await Categoria.findAll({
      attributes: ["id", "nombre", "descripcion"],
      where: { estado: true },
    });
  } catch (error) {
    throw new Error("Error al obtener las categorias: " + error);
  }
};

export const obtenerCategoriaPorId = async (id: string) => {
  try {
    return await Categoria.findOne({
      where: {
        id,
        estado: true,
      },
    });
  } catch (error) {
    throw new Error(`Error al obtener la categoria con id ${id}: ${error}`);
  }
};

export const crearCategoria = async (body: any) => {
  try {
    const existeNombre = await Categoria.findOne({
      where: {
        nombre: body.nombre,
        estado: true,
      },
    });

    if (existeNombre) {
      throw new Error(`Ya existe una categoria con el nombre ${body.nombre}`);
    }

    return await Categoria.create({ ...body, estado: true });
  } catch (error) {
    throw new Error("Error al crear la categoria: " + error);
  }
};

export const actualizarCategoria = async (id: string, body: any) => {
  try {
    const categoria = await Categoria.findOne({
      where: {
        id,
        estado: true,
      },
    });
    if (!categoria) {
      throw new Error(`No existe una categoria con id ${id}`);
    }
    return await categoria.update(body);
  } catch (error) {
    throw new Error(`Error al actualizar la categoria con id ${id}: ${error}`);
  }
};

export const desacticarCategoria = async (id: string) => {
  try {
    const categoria = (await Categoria.findOne({
      where: {
        id,
        estado: true,
      },
    })) as CategoriaAttributes | null;

    if (!categoria) {
      throw new Error(`No existe una categoria con la id ${id}`);
    }

    const nuevoNombre = `${categoria.nombre}_deleted_${Date.now()}`;
    return await Categoria.update(
      {
        estado: false,
        nombre: nuevoNombre,
      },
      {
        where: { id },
      }
    );
  } catch (error) {
    throw new Error(`Error al eliminar la categoria con id ${id}: ${error}`);
  }
};
