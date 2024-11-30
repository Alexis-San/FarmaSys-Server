//falta agregar el campo ci a la consulta sql y devolver un mensaje si se repite el ci
import { Op } from "sequelize";
import Cliente from "../models/cliente";

export const getClientes = async () => {
  return await Cliente.findAll({
    where: {
      estado: true,
    },
    attributes: [
      "id",
      "nombre",
      "apellido",
      "ci",
      "email",
      "telefono",
      "tipo_cliente",
    ],
  });
};

// Servicio para buscar clientes por nombre, apellido o ci
export const buscarClientes = async (
  nombre?: string,
  apellido?: string,
  ci?: string
) => {
  const whereClause: any = { estado: true };

  if (nombre) {
    whereClause.nombre = { [Op.like]: `%${nombre.toUpperCase()}%` };
  }
  if (apellido) {
    whereClause.apellido = { [Op.like]: `%${apellido.toUpperCase()}%` };
  }
  if (ci) {
    whereClause.ci = { [Op.like]: `%${ci}%` };
  }

  return await Cliente.findAll({
    where: whereClause,
    attributes: [
      "id",
      "nombre",
      "apellido",
      "ci",
      "email",
      "telefono",
      "tipo_cliente",
    ],
  });
};

export const getCliente = async (id: string) => {
  return await Cliente.findOne({
    where: {
      id,
      estado: true,
    },
    attributes: [
      "id",
      "nombre",
      "apellido",
      "ci",
      "email",
      "telefono",
      "tipo_cliente",
    ],
  });
};

export const createCliente = async (body: any) => {
  try {
    const nombreMayusculas = body.nombre?.toUpperCase();
    const apellidoMayusculas = body.apellido?.toUpperCase();
    const emailMayusculas = body.email?.toUpperCase();
    const tipoClienteMayusculas = body.tipo_cliente?.toUpperCase();

    // Verificar si ya existe un cliente con el mismo CI
    const clienteExistente = await Cliente.findOne({
      where: {
        ci: body.ci,
        estado: true,
      },
    });

    if (clienteExistente) {
      throw new Error(`Ya existe un cliente con el CI ${body.ci}`);
    }

    return await Cliente.create({
      ...body,
      nombre: nombreMayusculas,
      apellido: apellidoMayusculas,
      email: emailMayusculas,
      tipo_cliente: tipoClienteMayusculas,
      estado: true,
    });
  } catch (error) {
    throw new Error("Error al crear el cliente: " + error);
  }
};
export const actualizarCliente = async (id: string, body: any) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new Error(`No existe un cliente con id ${id}`);
  }
  return await cliente.update(body);
};

export const deleteCliente = async (id: string) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new Error("no existe un cliente con la id " + id);
  }
  await cliente.update({ estado: false });
  return cliente;
};
