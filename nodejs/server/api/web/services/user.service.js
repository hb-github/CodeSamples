import User from '../../../models/user';
import BaseService from '../../../shared/base.service';

class UserService extends BaseService {
  whitelist = ['name', 'username', 'email', 'password'];

  getUserByName = async username => {
    return await User.findOne({ username }).exec();
  };
  create = async user => {
    const params = this.filterParams(user, this.whitelist);
    let newUser = new User({ ...params });
    return await newUser.save();
  };
  get = async id => {
    return await User.findById(id).exec();
  };

  
}

export default new UserService();
