import { Router } from 'express';
import { getActuadores} from '../controllers/actuadores';

const router=Router();
router.get('/',getActuadores);

export default router;