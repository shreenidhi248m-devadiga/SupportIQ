"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        ...(data && typeof data === 'object' && !Array.isArray(data) && data.token
            ? data
            : { data }),
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 400, errors = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors }),
    });
};
exports.sendError = sendError;
