import { Router } from "express";
import {
  buscarProductosController,
  deleteProducto,
  getProductoPorId,
  getProductos,
  postProducto,
  putProducto,
} from "../controllers/productosController";

const router = Router();
router.get('/buscar', buscarProductosController);
router.get("/", getProductos);
router.get("/:id", getProductoPorId);
router.post("/", postProducto);
router.put("/:id", putProducto);
router.delete("/:id", deleteProducto);
export default router;
