import { Router } from 'express';

//Routes
import UserRoutes from './user.routes';
import AuthRoutes from './auth.routes';

const router = Router();

router.use('/v1/auth', AuthRoutes);
router.use('/v1/', UserRoutes);

export default router;
