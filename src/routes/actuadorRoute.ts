import { Router } from 'express';
import { getActuadores} from '../controllers/actuadoresController';

const router=Router();
router.get('/',getActuadores);

export default router;

