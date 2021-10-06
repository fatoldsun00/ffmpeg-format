const i18n = require("./i18n");

const sError = (httpCode, errorCode, errStack = undefined) => {
    let err = new Error(i18n.__(errorCode));
    err.statusCode = httpCode;
    err.errorCode = errorCode;
    if (errStack != undefined) err.stack = errStack;

    return err;
};

//Error handler for front-end route request
const sFrontError = (err, req, res, next) => {
    res.locals.error = {
        status: err.statusCode == undefined ? 418 : err.statusCode,
        message: {
            code: err.errorCode,
            errmsg: err.message,
        },
    };

    next(err);
};

//Error handler for log into console
const sLogConsoleError = (err, req, res, next) => {
    console.log(err);
    next(err);
};

//Error handler for debuging
const sDebugError = (err, req, res, next) => {
    if (req.query.debug) {
        res.locals.error = {
            status: err.statusCode == undefined ? 418 : err.statusCode,
            message: {
                status: err.statusCode,
                code: err.errorCode,
                errmsg: err.message,
                stack: err.stack,
                from: "debugger",
            },
        };
    }
    next(err);
};

//Error handler for front-end request
const sendResError = (err, req, res, next) => {
    if (res.locals.error != undefined && res.locals.error.status != undefined) {
        res.status(res.locals.error.status).json(res.locals.error.message);
    } else {
        res.status(err.status).json(err.message);
    }
};

module.exports = {
    sError,
    sLogConsoleError,
    sFrontError,
    sDebugError,
    sendResError,
};
