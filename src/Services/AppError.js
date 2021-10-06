const i18n = require("./i18n");

class AppError extends Error {
    constructor(statusCode, message, errStack = undefined) {
        super(i18n.__(message));
        this.statusCode = statusCode;
        this.errorCode = message;
        if (errStack != undefined) err.stack = errStack;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
