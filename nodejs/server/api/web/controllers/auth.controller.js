import AuthService from '../services/auth.service';

class AuthController {
	constructor() {}

	login = async (credentials) => {
		let result = await AuthService.login(credentials);
		if (result) {
			return result;
		}
	};

	singUp = async (user) => {
		let savedUser = await AuthService.singUp(user);
		if (savedUser) {
			return savedUser;
		}
	};
}
export default new AuthController();
