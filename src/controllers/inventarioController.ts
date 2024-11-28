import { Request, Response } from "express";
import * as inventarioService from "../services/inventarioService";

export const getInventarios = async (req: Request, res: Response) => {
  try {
    const inventarios = await inventarioService.obtenerInventarios();
    res.json(inventarios);
    return;
  } catch (error) {
    res.status(500).json({ msg: (error as Error).message });
    return;
  }
};

export const getInventario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const inventario = await inventarioService.obtenerInventarioPorId(id);
    if (!inventario) {
      res.status(404).json({ msg: `No existe inventario con id ${id}` });
      return;
    }
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ msg: (error as Error).message });
    return;
  }
};

export const postInventario = async (req: Request, res: Response) => {
  try {
    const inventario = await inventarioService.crearInventario(req.body);
    res.status(201).json(inventario);
    return;
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
    return;
  }
};

export const putInventario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const inventario = await inventarioService.actualizarInventario(
      id,
      req.body
    );
    res.json(inventario);
    return;
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
    return;
  }
};

export const deleteInventario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await inventarioService.desactivarInventario(id);
    res.json({ msg: "Inventario eliminado exitosamente" });
    return;
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};
