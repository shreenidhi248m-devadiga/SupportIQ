"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.resetPassword = exports.forgotPassword = exports.loginAdmin = exports.loginCustomer = exports.registerCustomer = void 0;
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User"));
const authService_1 = require("../services/authService");
const responseHandler_1 = require("../utils/responseHandler");
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    phone: zod_1.z.string().optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
const registerCustomer = async (req, res) => {
    try {
        const parseResult = registerSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { name, email, password, phone } = parseResult.data;
        const existingUser = await User_1.default.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            (0, responseHandler_1.sendError)(res, 'User with this email already exists.', 400);
            return;
        }
        const hashedPassword = await authService_1.AuthService.hashPassword(password);
        const newUser = new User_1.default({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone,
            role: 'customer',
        });
        await newUser.save();
        const token = authService_1.AuthService.generateToken(newUser);
        (0, responseHandler_1.sendSuccess)(res, 'Customer registration successful', {
            token,
            user: authService_1.AuthService.formatUserResponse(newUser),
        }, 201);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error registering customer', 500);
    }
};
exports.registerCustomer = registerCustomer;
const loginCustomer = async (req, res) => {
    try {
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { email, password } = parseResult.data;
        const user = await User_1.default.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user || user.role !== 'customer') {
            (0, responseHandler_1.sendError)(res, 'Invalid credentials or non-customer account.', 401);
            return;
        }
        const isMatch = await authService_1.AuthService.comparePassword(password, user.password);
        if (!isMatch) {
            (0, responseHandler_1.sendError)(res, 'Invalid email or password.', 401);
            return;
        }
        user.lastLogin = new Date();
        await user.save();
        const token = authService_1.AuthService.generateToken(user);
        (0, responseHandler_1.sendSuccess)(res, 'Customer login successful', {
            token,
            user: authService_1.AuthService.formatUserResponse(user),
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error during login', 500);
    }
};
exports.loginCustomer = loginCustomer;
const loginAdmin = async (req, res) => {
    try {
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { email, password } = parseResult.data;
        const user = await User_1.default.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user || user.role !== 'admin') {
            (0, responseHandler_1.sendError)(res, 'Invalid credentials or unauthorized admin access.', 401);
            return;
        }
        const isMatch = await authService_1.AuthService.comparePassword(password, user.password);
        if (!isMatch) {
            (0, responseHandler_1.sendError)(res, 'Invalid email or password.', 401);
            return;
        }
        user.lastLogin = new Date();
        await user.save();
        const token = authService_1.AuthService.generateToken(user);
        (0, responseHandler_1.sendSuccess)(res, 'Admin authentication successful', {
            token,
            user: authService_1.AuthService.formatUserResponse(user),
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error during admin login', 500);
    }
};
exports.loginAdmin = loginAdmin;
const forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
});
const resetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address').optional(),
    token: zod_1.z.string().optional(),
    newPassword: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
const verifyEmailSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address').optional(),
    token: zod_1.z.string().optional(),
});
const forgotPassword = async (req, res) => {
    try {
        const parseResult = forgotPasswordSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { email } = parseResult.data;
        (0, responseHandler_1.sendSuccess)(res, 'Password reset instructions sent', {
            message: `If an account exists for ${email}, password reset instructions have been sent.`,
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error processing forgot password request', 500);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const parseResult = resetPasswordSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { email, newPassword } = parseResult.data;
        if (email) {
            const user = await User_1.default.findOne({ email: email.toLowerCase() });
            if (user) {
                user.password = await authService_1.AuthService.hashPassword(newPassword);
                await user.save();
            }
        }
        (0, responseHandler_1.sendSuccess)(res, 'Password updated successfully', {
            message: 'Your password has been updated. You can now sign in with your new password.',
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error resetting password', 500);
    }
};
exports.resetPassword = resetPassword;
const verifyEmail = async (req, res) => {
    try {
        const parseResult = verifyEmailSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { email } = parseResult.data;
        if (email) {
            const user = await User_1.default.findOne({ email: email.toLowerCase() });
            if (user) {
                user.isActive = true;
                await user.save();
            }
        }
        (0, responseHandler_1.sendSuccess)(res, 'Email verified successfully', {
            message: 'Your email address has been verified successfully. Welcome to SupportIQ!',
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error verifying email', 500);
    }
};
exports.verifyEmail = verifyEmail;
