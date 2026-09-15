"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const User_1 = __importDefault(require("../models/User"));
const responseHandler_1 = require("../utils/responseHandler");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        if (!token) {
            (0, responseHandler_1.sendError)(res, 'Access denied. No token provided.', 401);
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user || !user.isActive) {
            (0, responseHandler_1.sendError)(res, 'Invalid or deactivated user token.', 401);
            return;
        }
        req.user = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        };
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            (0, responseHandler_1.sendError)(res, 'Token has expired. Please login again.', 401);
            return;
        }
        (0, responseHandler_1.sendError)(res, 'Invalid authentication token.', 401);
    }
};
exports.authenticateToken = authenticateToken;
