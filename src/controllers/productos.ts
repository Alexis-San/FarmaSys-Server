import { Request, Response } from 'express';
import Producto from '../models/producto';

//Lista de productos
export const getProductos =async (req:Request, res:Response) =>{
    
    const productos = await  Producto.findAll()
  
    res.json({productos});
}                                                                                                                                                                                                                                       