import { Request, Response } from "express";
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  desactivarProducto,
} from "../services/productoService";

export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los productos", error });
  }
};

export const getProductoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await obtenerProductoPorId(id);
    if (!producto) {
      return res
        .status(404)
        .json({ msg: `No existe un producto con el id ${id}` });
    }
    res.json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al obtener el producto con id ${id}`, error });
  }
};

export const postProducto = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const producto = await crearProducto(body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el producto", error });
  }
};

export const putProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const producto = await actualizarProducto(id, body);
    res.json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al actualizar el producto con id ${id}`, error });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await desactivarProducto(id);
    res.json({ msg: `Producto con id ${id} eliminado` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error al eliminar el producto con id ${id}`, error });
  }
};
