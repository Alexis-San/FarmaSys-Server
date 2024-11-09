import { Request, Response } from 'express';
import actuador from '../models/actuador';


//Lista de actuadores
export const getActuadores = async (req: Request, res: Response) => {

    const actuadores = await actuador.findAll();

    res.json({ actuadores });
}