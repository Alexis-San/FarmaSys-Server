import { Router } from "express";
import {
  obtenerVentasInforme,
  obtenerVentasUltimoMes,
  obtenerHistorialVentasCliente,
  obtenerVentasFiltradas,
  obtenerTopProductos,
  obtenerMontosTresMeses,
} from "../controllers/informesController";

const router = Router();
router.get("/ventas/buscar/:busqueda", obtenerVentasFiltradas);
router.get("/ventas", obtenerVentasInforme);
router.get("/ventas/ultimo-mes", obtenerVentasUltimoMes);
router.get("/ventas/cliente/:clienteId", obtenerHistorialVentasCliente);
router.get("/top-productos", obtenerTopProductos);
router.get("/montos-tres-meses", obtenerMontosTresMeses);

export default router;
