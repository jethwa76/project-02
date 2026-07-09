import { Router } from 'express';
import { deleteUser, listUsers, recentActivity, updateUserStatus } from '../controllers/user.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import { idParamSchema } from '../validators/item.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.use(protect, authorize('admin'));
router.get('/', listUsers);
router.get('/activity', recentActivity);
router.put('/:id/status', validate(idParamSchema), updateUserStatus);
router.delete('/:id', validate(idParamSchema), deleteUser);

export default router;
