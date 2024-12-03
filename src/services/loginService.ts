import Usuario from "../models/usuario";
import { LoginAttributes } from "../interfaces/loginInterface";
export const desloguearUsuarios = async () => {
  await Usuario.update({ logeado: false }, { where: {} });
};

export const loginUsuario = async (email: string, password: string) => {
  try {
    // Log inputs for debugging
    console.log("Attempting login with:", { email, password });

    const usuario = await Usuario.findOne({
      where: {
        email,
        password,
        estado: true,
      },
    });

    // Log if user was found
    console.log("User found:", usuario ? "yes" : "no");

    if (!usuario) {
      throw new Error("Credenciales inválidas");
    }

    // Log before update
    console.log("Updating user login status");

    await usuario.update({ logeado: true });
    return usuario;
  } catch (error: any) {
    console.error("Login service error:", error);
    // Re-throw with more specific error
    throw new Error(`Error en el login: ${error.message || error}`);
  }
};

export const obtenerUsuarioLogeado = async (): Promise<LoginAttributes> => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        estado: true,
        logeado: true,
      },
      attributes: ["id", "email", "password", "logeado"],
    });

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // Asegurarse de que el objeto devuelto coincide con LoginAttributes
    const usuarioLogeado: LoginAttributes = {
      id: usuario.getDataValue("id"),
      email: usuario.getDataValue("email"),
      password: usuario.getDataValue("password"),
      logeado: usuario.getDataValue("logeado"),
    };

    return usuarioLogeado;
  } catch (error: any) {
    console.error("Error al obtener datos del usuario:", error);
    throw new Error(`Error al obtener datos: ${error.message || error}`);
  }
};
