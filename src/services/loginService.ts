import Usuario from "../models/usuario";

export const desloguearUsuarios = async () => {
  await Usuario.update({ logeado: false }, { where: {} });
};
export const loginUsuario = async (email: string, password: string) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        email,
        password,
        estado: true,
      },
    });

    if (!usuario) {
      throw new Error("Credenciales inválidas");
    }

    await usuario.update({ logeado: true });
    return usuario;
  } catch (error) {
    throw new Error(`Error en el login: ${error}`);
  }
};
