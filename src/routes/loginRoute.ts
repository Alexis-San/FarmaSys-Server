import { Router } from "express";
import { login, logout, obtenerUsuario } from "../controllers/loginController";

const router = Router();

// Ruta para obtener el usuario logueado
router.get("/usuario", obtenerUsuario);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para cerrar sesión
router.post("/logout", logout);

export default router;
