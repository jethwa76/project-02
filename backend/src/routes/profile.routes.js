import { Router } from 'express';
import { changePassword, getProfile, updateProfile, uploadAvatar as saveAvatar } from '../controllers/profile.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { uploadAvatar } from '../middlewares/upload.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { changePasswordSchema, updateProfileSchema } from '../validators/profile.validator.js';

const router = Router();

router.use(protect);
router.get('/', getProfile);
router.put('/', validate(updateProfileSchema), updateProfile);
router.put('/password', validate(changePasswordSchema), changePassword);
router.post('/avatar', uploadAvatar.single('avatar'), saveAvatar);

export default router;
