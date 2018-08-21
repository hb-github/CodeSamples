import jwt from 'jsonwebtoken';
import CommonService from '../shared/common.service';
import Constants from '../config/constants';

const { sessionSecret } = Constants.security;
const FORBIDDEN = {
  status: 403,
  message: "You don't have permissions for this route!",
  data: {}
};

export default function authenticate(req, res, next) {
  const { authorization, isadmin } = req.headers;

  if (typeof authorization == 'undefined') {
    req.currentUser = false;
    return next(FORBIDDEN);
  }

  var bearerToken = authorization.replace(/^Bearer\s/, '');
  jwt.verify(bearerToken, sessionSecret, async (err, decoded) => {
    if (err) {
      return next(FORBIDDEN);
    }

    // If token is decoded successfully, find user and attach to our request
    // for use in our route or other middleware
    try {
      let user;
      if (isadmin) {
        user = await CommonService.adminInfoById(decoded._id);
      } else {
        user = await CommonService.userInfoById(decoded._id);
      }
      if (!user) {
        return next(FORBIDDEN);
      }
      req.currentUser = user;
      next();
    } catch (err) {
      next(err);
    }
  });
}
