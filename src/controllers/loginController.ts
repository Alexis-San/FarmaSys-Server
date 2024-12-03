import { Request, Response } from "express";
import {
  loginUsuario,
  desloguearUsuarios,
  obtenerUsuarioLogeado,
} from "../services/loginService";

export const login = async (req: Request, res: Response) => {
  console.log("Request body:", req.body); // Debug log

  const { email, password } = req.body;

  // Early return validation
  if (!email || !password) {
    console.log("Validation failed: missing email or password"); // Debug log
    res.status(400).json({
      msg: "Email y contraseña son requeridos",
    });
    return;
  }

  try {
    const usuario = await loginUsuario(email, password);
    res.json({
      msg: "Login exitoso",
    });
  } catch (error: any) {
    console.error("Login error:", error); // Debug log
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
    console.error("Logout error:", error); // Debug log
    res.status(500).json({
      msg: "Error en el servidor",
      error: error.message,
    });
  }
};
export const obtenerUsuario = async (_req: Request, res: Response) => {
  try {
    const usuario = await obtenerUsuarioLogeado();
    res.json({
      usuario,
    });
  } catch (error: any) {
    console.error("Error getting logged user:", error);
    res.status(400).json({
      msg: error.message,
    });
  }
};
