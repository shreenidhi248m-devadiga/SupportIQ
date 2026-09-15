"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
exports.env = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/supportiq',
    JWT_SECRET: process.env.JWT_SECRET || 'supportiq_jwt_secret_fallback_key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads',
};
