import { Router } from 'express';
import { getActuadores, getActuador, postActuador, putActuador, deleteActuador} from '../controllers/actuadoresController';

const router=Router();
router.get('/',getActuadores);
router.get('/:id', getActuador);
router.post('/', postActuador);
router.put('/:id', putActuador);
router.delete('/:id', deleteActuador);

export default router;
