const boom = require('boom');
import httpStatus from 'http-status';

// const asyncMiddleware = (fn) => (req, res, next) => {
// 	//Promise.resolve(fn(req, res, next)).catch(next());
// 	fn(req, res, next).catch(next);
// };

// wrapper for our async route handlers
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    if (!err.isBoom) {
      return next(boom.badImplementation(err));
    }
    next(err);
  });
};

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result);
  } catch (err) {
    // if (!err.isBoom) {
    //   return next(boom.badImplementation(err));
    // }
    next(err);
    //return res.status(500) && next(error);
  }
};

const asyncUtil = fn =>
  function asyncUtilWrap(req, res, next, ...args) {
    return new Promise(function(resolve) {
      resolve(fn(req, res, next, ...args));
    }).catch(next);
  };

let wrap = fn => (...args) => fn(...args).catch(args[2]);

exports.controllerHandler = controllerHandler;
exports.asyncUtil = asyncUtil;
exports.wrap = wrap;
exports.asyncMiddleware = asyncMiddleware;
