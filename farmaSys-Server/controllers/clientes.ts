import { Request, Response } from 'express';
import Cliente from '../models/cliente';



//Lista de clientes
export const getClientes =async (req:Request, res:Response) =>{
    
    const clientes = await Cliente.findAll();
  
    res.json({clientes});
}
// buscar cliente por id (pk)
export const getCliente = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const cliente= await Cliente.findByPk(id);

    if (cliente){
        res.json({cliente})
    } else {
        res.status(404).json({
            msg:'no existe el id '+ id
        });
    }
    
}

//Crear un nuevo cliente
export const postCliente = async (req:Request, res:Response) =>{
    const {body} = req;
    try {
        
        const cliente =Cliente.create({...body});

        
       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:' error al intentar crear un nuevo cliente ',
        })
    }
    
}

//eliminar cliente (eliminacion logica)
export const deleteCliente = async (req:Request, res:Response) =>{
    
    const{id}=req.params;
    const cliente=await Cliente.findByPk(id);
    if(!cliente){
        return res.status(404).json({
            msg:'no existe un cliente con la id ' +id
        });
    } else {
        await cliente.update({estado:false});
        res.json(cliente);
    }

}