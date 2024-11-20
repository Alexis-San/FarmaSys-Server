import { Router } from "express";
import {
  getCategorias,
  getCategoria,
  postCategoria,
  putCategoria,
  deleteCategoria,
} from "../controllers/categoriasController";

const router = Router();

router.get("/", getCategorias);
router.get("/:id", getCategoria);
router.post("/", postCategoria);
router.put("/:id", putCategoria);
router.delete("/:id", deleteCategoria);

export default router;
