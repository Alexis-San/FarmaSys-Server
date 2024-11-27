import Usuario from "../models/usuario";
import { UsuarioAttributes } from "../interfaces/usuarioInterfaz";
export const obtenerUsuarios = async () => {
  return await Usuario.findAll({
    where: {
      estado: true,
    },
    attributes: ["id", "nombre", "email", "rol"],
  });
};

export const obtenerUsuarioPorId = async (id: string) => {
  return await Usuario.findOne({
    where: {
      id,
      estado: true,
    },
    attributes: ["id", "nombre", "email", "rol"],
  });
};

export const crearUsuario = async (body: any) => {
  const existeEmail = await Usuario.findOne({
    where: { email: body.email },
  });

  if (existeEmail) {
    throw new Error(`Ya existe un usuario con el email ${body.email}`);
  }

  return await Usuario.create({ ...body });
};

export const actualizarUsuario = async (id: string, body: any) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new Error(`No existe un usuario con id ${id}`);
  }
  return await usuario.update(body);
};

export const desactivarUsuario = async (id: string) => {
  try {
    const usuario = (await Usuario.findOne({
      where: {
        id,
        estado: true,
      },
    })) as UsuarioAttributes | null;

    if (!usuario) {
      throw new Error(`No existe un usuario con la id ${id}`);
    }

    const nuevoNombre = `${usuario.nombre}_deleted_${Date.now()}`;
    return await Usuario.update(
      {
        estado: false,
        nombre: nuevoNombre,
      },
      {
        where: { id },
      }
    );
  } catch (error) {
    throw new Error(`Error al desactivar el usuario con id ${id}: ${error}`);
  }
};
