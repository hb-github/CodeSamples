import { Router } from 'express';
import httpStatus from 'http-status';
import authenticate from '../../../middleware/authenticate';
import adminController from '../controllers/admin.controller';

import {
  asyncMiddleware,
  controllerHandler,
  wrap
} from '../../../utils/async-handler';

const router = new Router();

class AdminRoutes {
  constructor() {}
  get routes() {
    router.get('/admin/me', authenticate, adminController.fetch);
    router.post(
      '/admin',
      authenticate,
      controllerHandler(adminController.create, req => [req])
    );
    router.post(
      '/forgot-password',
      controllerHandler(adminController.forgotPassword, req => [req.body])
    );
    router.post(
      '/edit-profile',
      authenticate,
      controllerHandler(adminController.editProfile, req => [req])
    );

    router.post(
      '/change-password',
      authenticate,
      controllerHandler(adminController.changePassword, req => [req])
    );

    return router;
  }
}

export default new AdminRoutes().routes;
