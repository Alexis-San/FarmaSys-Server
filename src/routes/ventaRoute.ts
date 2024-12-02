import { Router } from "express";
import {
  crearVenta,
  agregarDetallesVenta,
} from "../controllers/ventaController";

const router = Router();

// Ruta para crear nueva venta
router.post("/", crearVenta);

// Ruta para agregar detalles a la venta
router.post("/detalles", agregarDetallesVenta);

export default router;
