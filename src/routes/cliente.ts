import { Router } from 'express';
import {getClientes, getCliente, postCliente, deleteCliente} from '../controllers/clientes';

const router=Router();
router.get('/',getClientes);
router.get('/:id',getCliente);
router.post('/',postCliente);
//router.put('/:id',putCliente);
//router.delete('/:id',deleteCliente);


export default router;