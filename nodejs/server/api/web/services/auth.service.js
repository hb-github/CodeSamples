import User from '../../../models/user';
import BaseService from '../../../shared/base.service';
import httpStatus from 'http-status';
import errMessages from '../../../shared/message';

class AuthService extends BaseService {
  loginlist = ['email', 'password'];
  signuplist = ['name', 'username', 'email', 'mobile', 'password'];

  login = async credentials => {
    const { email, password } = this.filterParams(credentials, this.loginlist);
    const user = await User.findOne({ email });
    //console.log(user);
    if (!user || !user.authenticate(password)) {
      //this.throwError(401,'Please verify your credentials.')
      const err = new Error('Please verify your credentials.');
      err.status = 401;
      throw err;
    }

    return { user: user.toJSON(), token: user.generateToken() }; //user.generateToken();
    //return res.status(200).json({ token });
  };
  singUp = async (user, res) => {
    const params = this.filterParams(user, this.signuplist);
    let newUser = new User({ ...params });
    let result = await newUser.save();

    //await sendActivationMail
    return this.sendResponse(httpStatus.OK, errMessages.REGISTER_MESSAGE, {});
  };
}

export default new AuthService();
