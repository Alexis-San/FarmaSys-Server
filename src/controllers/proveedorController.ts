import { Request, Response } from "express";
import {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  desactivarProveedor,
} from "../services/proveedorService";

export const getProveedores = async (req: Request, res: Response) => {
  try {
    const proveedores = await obtenerProveedores();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los proveedores", error });
  }
};

export const getProveedorPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedor = await obtenerProveedorPorId(id);
    if (!proveedor) {
      return res
        .status(404)
        .json({ msg: `No existe un proveedor con el id ${id}` });
    }
    res.json(proveedor);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al obtener el proveedor con id ${id}`, error });
  }
};

export const createProveedor = async (req: Request, res: Response) => {
  try {
    const nuevoProveedor = await crearProveedor(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el proveedor", error });
  }
};

export const updateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proveedorActualizado = await actualizarProveedor(id, req.body);
    res.json(proveedorActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al actualizar el proveedor con id ${id}`, error });
  }
};

export const deactivateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await desactivarProveedor(id);
    res.json({ msg: `Proveedor con id ${id} eliminado` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al eliminar el proveedor con id ${id}`, error });
  }
};
