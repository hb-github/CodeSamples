import Constants from '../config/constants';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import APIError from '../utils/ApiError';

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    status: false,
    errors: err.errors
    //stack: err.stack
  };

  if (!Constants.envs.development) {
    delete response.stack;
  }

  res
    .status(err.status)
    .json(response)
    .end();
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
      isPublic: true
    });
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'API route not found',
    status: httpStatus.NOT_FOUND
  });
  return handler(err, req, res);
};

// exports.mongooseErrorHandler = (err, req, res, next)=> {
//   console.log('=============');
//   console.log(err.errors);
//   else if (err.errors) {
//     const error = {};
//     const keys = Object.keys(err.errors);

//     keys.forEach((key) => {
//         let message = err.errors[key].message;

//         if (err.errors[key].properties && err.errors[key].properties.message) {
//             message = err.errors[key].properties.message.replace('`{PATH}`', key);
//         }

//         message = message.replace('Path ', '').replace(key,'').trim();
//         error[key] = message;
//     });

//     convertedError = new APIError({
//       message: error,
//       status: err.status,
//       stack: err.stack,
//     });
//     //return res.status(500).json(error); // or return next(error);
// }

//   next();
// };
