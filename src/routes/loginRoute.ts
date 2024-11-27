import { Router } from "express";
import { login, logout } from "../controllers/loginController";

const router = Router();

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para cerrar sesión
router.post("/logout", logout);

export default router;
