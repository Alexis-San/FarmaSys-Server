import Usuario from "../models/usuario";

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
