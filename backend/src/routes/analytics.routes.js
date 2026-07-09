import { Router } from 'express';
import { dashboardAnalytics } from '../controllers/analytics.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/dashboard', protect, dashboardAnalytics);

export default router;
