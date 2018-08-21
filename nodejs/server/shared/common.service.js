import User from '../models/user';
import Admin from '../models/admin';
//import BaseService from './base.service';

class CommonService {
  userInfoById = async id => {
    return await User.findById(id).exec();
  };
  adminInfoById = async id => {
    return await Admin.findById(id).exec();
  };
  getRole = role => {
    switch (role) {
      case 'admin':
        return 2;
      case 'user':
        return 1;
      default:
        return 0;
    }
  };
}

export default new CommonService();
