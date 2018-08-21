import AdminService from '../services/admin.service';
import httpStatus from 'http-status';
import APIError from '../../../utils/ApiError';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';

const NOT_AUTHORIZED = 'You are not authorized.';

class AdminController {
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

  create = async req => {
    return await AdminService.create(req);
  };

  forgotPassword = async req => {
    return await AdminService.forgotPassword(req);
  };

  editProfile = async req => {
    return await AdminService.editProfile(req);
  };

  changePassword = async req => {
    return await AdminService.changePassword(req);
  };
}
export default new AdminController();
