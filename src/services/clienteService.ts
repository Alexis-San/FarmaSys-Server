import Cliente from '../models/cliente';

export const getClientes = async () => {
    return await Cliente.findAll();
}

export const getCliente = async (id: string) => {
    return await Cliente.findByPk(id);
}

export const createCliente = async (body: any) => {
    return await Cliente.create({ ...body });
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
        throw new Error('no existe un cliente con la id ' + id);
    }
    await cliente.update({ estado: false });
    return cliente;
}