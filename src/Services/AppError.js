const i18n = require('./i18n')

class AppError extends Error {
  constructor(statusCode, message, errStack = undefined) {
    super(i18n.__(message))
    this.statusCode = statusCode;
    if (errStack != undefined) err.stack = errStack
    
    Error.captureStackTrace(this, this.constructor);
    console.log(message,i18n.__('ERR_TIME_OUTSIDE_DURATION'));
  }
}

module.exports = AppError
