import { Router } from 'express';
import httpStatus from 'http-status';
import authenticate from '../../../middleware/authenticate';
import userController from '../controllers/user.controller';

import { controllerHandler, asyncMiddleware } from '../../../utils/async-handler';

const router = new Router();

class UserRoutes {
	constructor() {}
	get routes() {
    router.get('/users/me', authenticate, userController.fetch);
    
    //Create Staff Members
		router.post('/users', controllerHandler(userController.create, (req) => [ req.body ]));

		return router;
	}
}

export default new UserRoutes().routes;
