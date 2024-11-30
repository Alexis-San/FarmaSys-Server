import { Router } from "express";
import {
  getClientes,
  getCliente,
  postCliente,
  putCliente,
  deleteCliente,
  buscarClientes,
} from "../controllers/clientesController";

const router = Router();
router.get("/buscar", buscarClientes);
router.get("/", getClientes);
router.get("/:id", getCliente);
router.post("/", postCliente);
router.put("/:id", putCliente);
router.delete("/:id", deleteCliente);

export default router;
