import httpStatus from 'http-status';
import Admin from '../../../models/admin';
import BaseService from '../../../shared/base.service';
import errMessages from '../../../shared/message';

// This class is responsilbe for Authentication type methods
class AuthService extends BaseService {
  loginlist = ['email', 'password'];

  login = async credentials => {
    const { email, password } = this.filterParams(credentials, this.loginlist);
    const user = await Admin.findOne({ email });
    if (!user || !user.authenticate(password)) {
      const err = new Error('Please verify your credentials.');
      err.status = 401;
      throw err;
    }
    let result = {
      user: user.toJSON(),
      token: user.generateToken()
    };
    return this.sendResponse(httpStatus.OK, true, '', result);
  };
}

export default new AuthService();
