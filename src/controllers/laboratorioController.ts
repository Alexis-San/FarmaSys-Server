import { Request, Response } from "express";
import {
  obtenerLaboratorios,
  obtenerLaboratorioPorId,
  crearLaboratorio,
  actualizarLaboratorio,
  desactivarLaboratorio,
} from "../services/laboratorioService";

export const getLaboratorios = async (req: Request, res: Response) => {
  try {
    const laboratorios = await obtenerLaboratorios();
    res.json(laboratorios);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los laboratorios", error });
  }
};

export const getLaboratorioPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const laboratorio = await obtenerLaboratorioPorId(id);
    if (!laboratorio) {
      return res
        .status(404)
        .json({ msg: `No existe un laboratorio con el id ${id}` });
    }
    res.json(laboratorio);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al obtener el laboratorio con id ${id}`, error });
  }
};

export const createLaboratorio = async (req: Request, res: Response) => {
  try {
    const nuevoLaboratorio = await crearLaboratorio(req.body);
    res.status(201).json(nuevoLaboratorio);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el laboratorio", error });
  }
};

export const updateLaboratorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const laboratorioActualizado = await actualizarLaboratorio(id, req.body);
    res.json(laboratorioActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al actualizar el laboratorio con id ${id}`, error });
  }
};

export const deactivateLaboratorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await desactivarLaboratorio(id);
    res.json({ msg: `Laboratorio con id ${id} eliminado` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al eliminar el laboratorio con id ${id}`, error });
  }
};
