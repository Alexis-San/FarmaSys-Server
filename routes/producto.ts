import { Router } from 'express';
import { getProductos } from '../controllers/productos';

const router=Router();
router.get('/',getProductos);

export default router;