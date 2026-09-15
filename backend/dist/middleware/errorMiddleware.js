"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const responseHandler_1 = require("../utils/responseHandler");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(`Error on ${req.method} ${req.originalUrl}:`, err);
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';
    (0, responseHandler_1.sendError)(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    (0, responseHandler_1.sendError)(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};
exports.notFoundHandler = notFoundHandler;
