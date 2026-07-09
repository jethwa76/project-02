import { Router } from 'express';
import { createItem, deleteItem, exportCsv, getItem, itemStats, listItems, updateItem } from '../controllers/item.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createItemSchema, idParamSchema, itemQuerySchema, updateItemSchema } from '../validators/item.validator.js';

const router = Router();

router.use(protect);
router.get('/stats', itemStats);
router.get('/export/csv', exportCsv);
router.get('/', validate(itemQuerySchema), listItems);
router.post('/', validate(createItemSchema), createItem);
router.get('/:id', validate(idParamSchema), getItem);
router.put('/:id', validate(idParamSchema), validate(updateItemSchema), updateItem);
router.delete('/:id', validate(idParamSchema), deleteItem);

export default router;
