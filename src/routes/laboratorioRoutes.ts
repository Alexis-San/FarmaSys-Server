import { Router } from "express";
import {
  getLaboratorios,
  getLaboratorioPorId,
  createLaboratorio,
  updateLaboratorio,
  deactivateLaboratorio,
} from "../controllers/laboratorioController";

const router = Router();

router.get("/", getLaboratorios);
router.get("/:id", getLaboratorioPorId);
router.post("/", createLaboratorio);
router.put("/:id", updateLaboratorio);
router.delete("/:id", deactivateLaboratorio);

export default router;
