// src/controllers/usuario.controller.ts
import { Request, Response } from 'express';
import * as usuarioService from '../services/usuarios'

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json({ usuarios });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios' });
    }
};

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.obtenerUsuarioPorId(id);
        if (usuario) {
            res.json({ usuario });
        } else {
            res.status(404).json({ msg: 'No existe el id ' + id });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el usuario' });
    }
};

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const usuario = await usuarioService.crearUsuario(body);
        res.json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ msg: error.message });
        } else {
            res.status(400).json({ msg: 'Unknown error' });
        }
    }
};

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await usuarioService.actualizarUsuario(id, body);
        res.json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ msg: error.message });
        } else {
            res.status(404).json({ msg: 'Unknown error' });
        }
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.desactivarUsuario(id);
        res.json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ msg: error.message });
        } else {
            res.status(404).json({ msg: 'Unknown error' });
        }
    }
};
