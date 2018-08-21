import httpStatus from 'http-status';

import Admin from '../../../models/admin';
import BaseService from '../../../shared/base.service';
import errMessages from '../../../shared/message';

class AdminService extends BaseService {
  whitelist = ['name', 'status', 'email', 'password', 'role'];

  create = async reqUser => {
    const user = reqUser.body;
    const params = this.filterParams(user, this.whitelist);
    params.createdBy = reqUser.currentUser.id;
    let newUser = new Admin({ ...params });
    const result = await newUser.save();
    return this.sendResponse(
      httpStatus.OK,
      errMessages.ADMIN_ADDED_SUCCESS,
      {}
    );
  };

  forgotPassword = async reqUser => {
    const user = reqUser.body;
    // const params = this.filterParams(user, this.whitelist);
    // params.createdBy = reqUser.currentUser.id;
    // let newUser = new Admin({ ...params });
    // const result = await newUser.save();
    // return this.sendResponse(
    //   httpStatus.OK,
    //   errMessages.ADMIN_ADDED_SUCCESS,
    //   {}
    // );
  };

  editProfile = async reqUser => {
    const user = reqUser.body;
    const result = await Admin.findByIdAndUpdate(reqUser.currentUser.id, user, {
      new: true
    });
    return this.sendResponse(
      httpStatus.OK,
      errMessages.ADMIN_EDIT_SUCCESS,
      result
    );
  };
  changePassword = async reqUser => {
    const userReq = reqUser.body;
    const user = await Admin.findById({ _id: reqUser.currentUser.id });
    if (!user.authenticate(userReq.oldPassword)) {
      const err = new Error(errMessages.OLD_PASSWORD_NOT_MATCH);
      err.status = httpStatus.UNAUTHORIZED;
      throw err;
    }
    user.password = userReq.newPassword;
    const result = await user.save();
    return this.sendResponse(
      httpStatus.OK,
      errMessages.NEW_PASSWORD_CHANGED,
      {}
    );
  };
}

export default new AdminService();
