"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = exports.updateProfile = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const authService_1 = require("../services/authService");
const responseHandler_1 = require("../utils/responseHandler");
const notificationService_1 = require("../services/notificationService");
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await User_1.default.findById(userId);
        if (!user) {
            (0, responseHandler_1.sendError)(res, 'User not found', 404);
            return;
        }
        (0, responseHandler_1.sendSuccess)(res, 'Profile retrieved successfully', authService_1.AuthService.formatUserResponse(user));
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error fetching profile', 500);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name, phone, avatar } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user) {
            (0, responseHandler_1.sendError)(res, 'User not found', 404);
            return;
        }
        if (name)
            user.name = name;
        if (phone)
            user.phone = phone;
        if (avatar)
            user.avatar = avatar;
        await user.save();
        (0, responseHandler_1.sendSuccess)(res, 'Profile updated successfully', authService_1.AuthService.formatUserResponse(user));
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error updating profile', 500);
    }
};
exports.updateProfile = updateProfile;
const getNotifications = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            (0, responseHandler_1.sendError)(res, 'Unauthorized', 401);
            return;
        }
        const notifications = await notificationService_1.NotificationService.getUserNotifications(userId);
        (0, responseHandler_1.sendSuccess)(res, 'Notifications retrieved', notifications);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error fetching notifications', 500);
    }
};
exports.getNotifications = getNotifications;
