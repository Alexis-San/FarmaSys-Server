import { Request, Response } from "express";
import * as clienteService from "../services/clienteService";

//Lista de clientes
export const getClientes = async (req: Request, res: Response) => {
  const clientes = await clienteService.getClientes();
  res.json({ clientes });
};

// buscar cliente por id (pk)
export const getCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cliente = await clienteService.getCliente(id);

  if (cliente) {
    res.json({ cliente });
  } else {
    res.status(404).json({
      msg: "no existe el id " + id,
    });
  }
};

//Crear un nuevo cliente
export const postCliente = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const cliente = await clienteService.createCliente(body);
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: " error al intentar crear un nuevo cliente ",
    });
  }
};
//Actualizar un cliente existente
export const putCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const cliente = await clienteService.actualizarCliente(id, body);
    res.json(cliente);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ msg: error.message });
    } else {
      res.status(500).json({
        msg: "Error al actualizar el cliente",
      });
    }
  }
};

//eliminar cliente (eliminacion logica)
export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.deleteCliente(id);
    res.json(cliente);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ msg: error.message });
    } else {
      res.status(404).json({ msg: "Unknown error" });
    }
  }
};
