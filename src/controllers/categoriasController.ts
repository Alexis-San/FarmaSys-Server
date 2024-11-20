import { Request, Response } from "express";
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  desacticarCategoria,
} from "../services/categoriaService";

export const getCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ msg: error.message });
    } else {
      res.status(404).json({ msg: "Unknown error" });
    }
  }
};

export const getCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await obtenerCategoriaPorId(req.params.id);
    if (!categoria) {
      res.status(404).json({ msg: "Categoria no encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

export const postCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await crearCategoria(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

export const putCategoria = async (req: Request, res: Response) => {
  try {
    const categoria = await actualizarCategoria(req.params.id, req.body);
    res.json(categoria);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    await desacticarCategoria(req.params.id);
    res.json({ msg: "Categoria eliminada correctamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};
