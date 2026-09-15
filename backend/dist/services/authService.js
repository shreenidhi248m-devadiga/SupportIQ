"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../config/env");
class AuthService {
    static generateToken(user) {
        const options = {
            expiresIn: (env_1.env.JWT_EXPIRES_IN || '7d'),
        };
        return jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
        }, env_1.env.JWT_SECRET, options);
    }
    static async hashPassword(password) {
        const salt = await bcryptjs_1.default.genSalt(10);
        return bcryptjs_1.default.hash(password, salt);
    }
    static async comparePassword(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
    static formatUserResponse(user) {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || '',
            avatar: user.avatar || '',
            isActive: user.isActive,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
        };
    }
}
exports.AuthService = AuthService;
