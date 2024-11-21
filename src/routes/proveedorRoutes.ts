import { Router } from "express";
import {
  getProveedores,
  getProveedorPorId,
  createProveedor,
  updateProveedor,
  deactivateProveedor,
} from "../controllers/proveedorController";

const router = Router();

router.get("/", getProveedores);
router.get("/:id", getProveedorPorId);
router.post("/", createProveedor);
router.put("/:id", updateProveedor);
router.delete("/:id", deactivateProveedor);

export default router;
