"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireCustomer = exports.requireAdmin = exports.requireRole = void 0;
const responseHandler_1 = require("../utils/responseHandler");
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            (0, responseHandler_1.sendError)(res, 'Unauthorized access.', 401);
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            (0, responseHandler_1.sendError)(res, `Forbidden. Requires one of the following roles: ${allowedRoles.join(', ')}`, 403);
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.requireAdmin = (0, exports.requireRole)(['admin']);
exports.requireCustomer = (0, exports.requireRole)(['customer']);
