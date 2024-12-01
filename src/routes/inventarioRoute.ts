import { Router } from "express";
import {
  getInventarios,
  getInventario,
  postInventario,
  putInventario,
  deleteInventario,
  getInventarioConProductos,
} from "../controllers/inventarioController";

const router = Router();
// Ruta para buscar inventarios con productos
router.get("/buscar", getInventarioConProductos);
// Ruta para obtener todos los inventarios
router.get("/", getInventarios);

// Ruta para obtener un inventario por ID
router.get("/:id", getInventario);

// Ruta para crear un nuevo inventario
router.post("/", postInventario);

// Ruta para actualizar un inventario
router.put("/:id", putInventario);

// Ruta para desactivar un inventario
router.delete("/:id", deleteInventario);

export default router;
