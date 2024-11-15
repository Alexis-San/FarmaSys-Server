
import Usuario from '../models/usuario';

export const obtenerUsuarios = async () => {
    return await Usuario.findAll();
};

export const obtenerUsuarioPorId = async (id: string) => {
    return await Usuario.findByPk(id);
};

export const crearUsuario = async (body: any) => {
    const existeEmail = await Usuario.findOne({
        where: { email: body.email }
    });

    if (existeEmail) {
        throw new Error(`Ya existe un usuario con el email ${body.email}`);
    }

    return await Usuario.create({...body});
};

export const actualizarUsuario = async (id: string, body: any) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error(`No existe un usuario con id ${id}`);
    }
    return await usuario.update(body);
};

export const desactivarUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error(`No existe un usuario con la id ${id}`);
    }
    return await usuario.update({ estado: false });
};
