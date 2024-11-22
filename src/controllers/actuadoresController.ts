import { Request, Response } from "express";
import {
  obtenerActuadores,
  obtenerActuadorPorId,
  crearActuador,
  actualizarActuador,
  desactivarActuador,
} from "../services/actuadorService";

export const getActuadores = async (req: Request, res: Response) => {
  try {
    const actuadores = await obtenerActuadores();
    res.json(actuadores);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ msg: error.message });
    } else {
      res.status(404).json({ msg: "Unknown error" });
    }
  }
};

export const getActuador = async (req: Request, res: Response) => {
  try {
    const actuador = await obtenerActuadorPorId(req.params.id);
    if (!actuador) {
      res.status(404).json({ msg: "Actuador no encontrado" });
    }
    res.json(actuador);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

export const postActuador = async (req: Request, res: Response) => {
  try {
    const actuador = await crearActuador(req.body);
    res.status(201).json(actuador);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

export const putActuador = async (req: Request, res: Response) => {
  try {
    const actuador = await actualizarActuador(req.params.id, req.body);
    res.json(actuador);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

export const deleteActuador = async (req: Request, res: Response) => {
  try {
    await desactivarActuador(req.params.id);
    res.json({ msg: "Actuador eliminado correctamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};
