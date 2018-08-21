import { Router } from 'express';

//Routes
import AdminRoutes from './admin.routes';
import AuthRoutes from './auth.routes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/', AdminRoutes);

export default router;
