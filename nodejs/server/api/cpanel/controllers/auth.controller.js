import AuthService from '../services/auth.service';

class AuthController {
	constructor() {}

	login = async (credentials) => {
		let result = await AuthService.login(credentials);
		if (result) {
			return result;
		}
	};
}
export default new AuthController();
