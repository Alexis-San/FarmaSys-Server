import { Request, Response } from "express";
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  desactivarProducto,
  buscarProductos,
} from "../services/productoService";

export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (error) {
    console.error("Error en getProductos:", error); // Agregar log
    res.status(500).json({
      msg: "Error al obtener los productos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const buscarProductosController = async (
  req: Request,
  res: Response
) => {
  try {
    const { termino } = req.query;
    if (!termino || typeof termino !== "string") {
      res.status(400).json({
        msg: "El término de búsqueda es requerido",
      });
      return;
    }
    const productos = await buscarProductos(termino);
    res.json(productos);
  } catch (error) {
    res.status(500).json({
      msg: error instanceof Error ? error.message : "Error al buscar productos",
    });
  }
};

export const getProductoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await obtenerProductoPorId(id);
    if (!producto) {
      res.status(404).json({ msg: `No existe un producto con el id ${id}` });
      return;
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

  // Validación básica del body
  if (!body || Object.keys(body).length === 0) {
    res.status(400).json({
      msg: "El cuerpo de la solicitud está vacío",
    });
    return;
  }

  // Validación de campos requeridos
  const camposRequeridos = ["nombre_comercial", "presentacion", "precio_venta"];
  const camposFaltantes = camposRequeridos.filter((campo) => !body[campo]);

  if (camposFaltantes.length > 0) {
    res.status(400).json({
      msg: `Faltan campos requeridos: ${camposFaltantes.join(", ")}`,
    });
    return;
  }

  try {
    const nuevoProducto = await crearProducto(body);
    res.status(201).json({
      msg: "Producto creado exitosamente",
      data: nuevoProducto,
    });
  } catch (error) {
    if (error instanceof Error) {
      // Si es un error conocido (ej: producto duplicado)
      res.status(400).json({
        msg: error.message,
      });
      return;
    }

    // Error interno del servidor
    res.status(500).json({
      msg: "Error interno al crear el producto",
      error: "Unknown error",
    });
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
