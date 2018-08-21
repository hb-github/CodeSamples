import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { controllerHandler } from '../../../utils/async-handler';

const router = new Router();
class AuthRoutes {
	constructor() {}
	get routes() {
		router.post('/login', controllerHandler(AuthController.login, (req) => [ req.body ]));
		return router;
	}
}

export default new AuthRoutes().routes;
