import UserService from '../services/user.service';
import httpStatus from 'http-status';
import APIError from '../../../utils/ApiError';

const NOT_AUTHORIZED = 'You are not authorized.';

class UserController {
  constructor() {}
  fetch = (req, res, next) => {
    const user = req.user || req.currentUser;
    if (!user) {
      throw new APIError({ message: NOT_AUTHORIZED, status: 400 });
    }
    return res.json({
      code: httpStatus.OK,
      message: '',
      status: true,
      data: user
    });
  };

  getUser = id => {
    return UserService.get(id);
    //throw new Error('error.message')
  };
  create = async user => {
    let savedUser = await UserService.create(user);
    if (savedUser) {
      return savedUser.generateToken();
    }
  };
  
}

export default new UserController();
