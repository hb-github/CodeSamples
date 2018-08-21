import * as errors from './message';

class BaseService {
  filterParams(params, whitelist) {
    const filtered = {};
    for (const key in params) {
      if (whitelist.indexOf(key) > -1) {
        filtered[key] = params[key];
      }
    }
    return filtered;
  }

  formatApiError(err) {
    if (!err) {
      // eslint-disable-next-line no-console
      return console.error('Provide an error');
    }

    const formatted = {
      message: err.message
    };

    if (err.errors) {
      formatted.errors = {};
      const errors = err.errors;
      for (const type in errors) {
        if (errors.hasOwnProperty(type)) {
          formatted.errors[type] = errors[type].message;
        }
      }
    }

    return formatted;
  }

  throwError = (code, errorType, errorMessage) => error => {
    console.log('=======');
    if (!error) error = new Error(errorMessage || 'Default Error');
    error.code = code;
    error.errorType = errorType;
    throw error;
  };

  throwIf = (fn, code, errorType, errorMessage) => result => {
    if (fn(result)) {
      return throwError(code, errorType, errorMessage)();
    }
    return result;
  };

  sendSuccess = (res, message) => data => {
    res.status(200).json({ type: 'success', message, data });
  };

  sendError = (res, status, message) => error => {
    res.status(status || error.status).json({
      type: 'error',
      message: message || error.message,
      error
    });
  };
  sendResponse(code, status, message, result) {
    return {
      code: code,
      status: status,
      data: result,
      message: message
    };
  }
}

export default BaseService;
