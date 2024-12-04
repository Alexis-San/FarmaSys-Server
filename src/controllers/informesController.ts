import { Request, Response } from "express";
import {
  obtenerTodasLasVentasVentas,
  getVentasUltimoMes,
  getHistorialVentasCliente,
  filtrarVentasPorCliente,
  //getTopProductosVendidos,
  getMontosTresMeses,
} from "../services/informesService";

export const obtenerVentasInforme = async (req: Request, res: Response) => {
  try {
    const resultado = await obtenerTodasLasVentasVentas();

    if (!resultado.ok) {
      res.status(400).json(resultado);
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const obtenerVentasUltimoMes = async (req: Request, res: Response) => {
  try {
    const resultado = await getVentasUltimoMes();

    if (!resultado.ok) {
      res.status(400).json(resultado);
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const obtenerHistorialVentasCliente = async (
  req: Request,
  res: Response
) => {
  try {
    const { clienteId } = req.params;
    const resultado = await getHistorialVentasCliente(Number(clienteId));

    if (!resultado.ok) {
      res.status(400).json(resultado);
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const obtenerVentasFiltradas = async (req: Request, res: Response) => {
  try {
    const { busqueda } = req.params;
    const searchTerm = isNaN(Number(busqueda)) ? busqueda : Number(busqueda);
    const resultado = await filtrarVentasPorCliente(searchTerm);

    if (!resultado.ok) {
      res.status(400).json(resultado);
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
/*
export const obtenerTopProductos = async (req: Request, res: Response) => {
  try {
    const resultado = await getTopProductosVendidos();

    if (!resultado.ok) {
      res.status(400).json(resultado);
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
*/
export const obtenerMontosTresMeses = async (req: Request, res: Response) => {
  try {
    const resultado = await getMontosTresMeses();

    if (!resultado.ok) {
      res.status(400).json(resultado);
      return;
    }

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
