import express from 'express';
import { getItems } from './controllers/itemsController';
import { buyItem } from './controllers/purchasesController';

const router = express.Router();

router.get('/items', getItems);
router.post('/buy', buyItem);

export default router;
