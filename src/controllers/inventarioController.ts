import { Request, Response } from "express";
import * as inventarioService from "../services/inventarioService";

export const getInventarios = async (req: Request, res: Response) => {
  try {
    const inventarios = await inventarioService.obtenerInventarios();
    res.json(inventarios);
  } catch (error) {
    res.status(500).json({ msg: (error as Error).message });
  }
};

export const getInventario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const inventario = await inventarioService.obtenerInventarioPorId(id);
    if (!inventario) {
      return res.status(404).json({ msg: `No existe inventario con id ${id}` });
    }
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ msg: (error as Error).message });
  }
};

export const postInventario = async (req: Request, res: Response) => {
  try {
    const inventario = await inventarioService.crearInventario(req.body);
    res.status(201).json(inventario);
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
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
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const deleteInventario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await inventarioService.desactivarInventario(id);
    res.json({ msg: "Inventario desactivado exitosamente" });
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message });
  }
};
