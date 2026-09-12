import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import User from '../models/User';
import { AuthService } from '../services/authService';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { NotificationService } from '../services/notificationService';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);

    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    sendSuccess(res, 'Profile retrieved successfully', AuthService.formatUserResponse(user));
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching profile', 500);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, phone, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    await user.save();
    sendSuccess(res, 'Profile updated successfully', AuthService.formatUserResponse(user));
  } catch (error: any) {
    sendError(res, error.message || 'Error updating profile', 500);
  }
};

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      sendError(res, 'Unauthorized', 401);
      return;
    }

    const notifications = await NotificationService.getUserNotifications(userId);
    sendSuccess(res, 'Notifications retrieved', notifications);
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching notifications', 500);
  }
};
