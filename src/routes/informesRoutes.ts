import { Router } from "express";
import {
  obtenerVentasInforme,
  obtenerVentasUltimoMes,
  obtenerHistorialVentasCliente,
  obtenerVentasFiltradas,
} from "../controllers/informesController";

const router = Router();

router.get("/ventas", obtenerVentasInforme);
router.get("/ventas/ultimo-mes", obtenerVentasUltimoMes);
router.get("/ventas/cliente/:clienteId", obtenerHistorialVentasCliente);
router.get("/ventas/buscar/:busqueda", obtenerVentasFiltradas);

export default router;
