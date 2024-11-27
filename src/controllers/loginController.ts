import { Request, Response } from "express";
import { loginUsuario, desloguearUsuarios } from "../services/loginService";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        msg: "Email y contraseña son requeridos",
      });
    }

    const usuario = await loginUsuario(email, password);

    res.json({
      msg: "Login exitoso",
      usuario,
    });
  } catch (error: any) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    await desloguearUsuarios();

    res.json({
      msg: "Logout exitoso",
    });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error en el servidor",
      error: error.message,
    });
  }
};
