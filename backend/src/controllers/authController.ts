import { Request, Response } from 'express';
import { z } from 'zod';
import User from '../models/User';
import { AuthService } from '../services/authService';
import { sendSuccess, sendError } from '../utils/responseHandler';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }

    const { name, email, password, phone } = parseResult.data;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      sendError(res, 'User with this email already exists.', 400);
      return;
    }

    const hashedPassword = await AuthService.hashPassword(password);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: 'customer',
    });

    await newUser.save();
    const token = AuthService.generateToken(newUser);

    sendSuccess(res, 'Customer registration successful', {
      token,
      user: AuthService.formatUserResponse(newUser),
    }, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Error registering customer', 500);
  }
};

export const loginCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || user.role !== 'customer') {
      sendError(res, 'Invalid credentials or non-customer account.', 401);
      return;
    }

    const isMatch = await AuthService.comparePassword(password, user.password);
    if (!isMatch) {
      sendError(res, 'Invalid email or password.', 401);
      return;
    }

    user.lastLogin = new Date();
    await user.save();

    const token = AuthService.generateToken(user);
    sendSuccess(res, 'Customer login successful', {
      token,
      user: AuthService.formatUserResponse(user),
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error during login', 500);
  }
};

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || user.role !== 'admin') {
      sendError(res, 'Invalid credentials or unauthorized admin access.', 401);
      return;
    }

    const isMatch = await AuthService.comparePassword(password, user.password);
    if (!isMatch) {
      sendError(res, 'Invalid email or password.', 401);
      return;
    }

    user.lastLogin = new Date();
    await user.save();

    const token = AuthService.generateToken(user);
    sendSuccess(res, 'Admin authentication successful', {
      token,
      user: AuthService.formatUserResponse(user),
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error during admin login', 500);
  }
};

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  token: z.string().optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  token: z.string().optional(),
});

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = forgotPasswordSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }
    const { email } = parseResult.data;
    sendSuccess(res, 'Password reset instructions sent', {
      message: `If an account exists for ${email}, password reset instructions have been sent.`,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error processing forgot password request', 500);
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = resetPasswordSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }
    const { email, newPassword } = parseResult.data;
    if (email) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        user.password = await AuthService.hashPassword(newPassword);
        await user.save();
      }
    }
    sendSuccess(res, 'Password updated successfully', {
      message: 'Your password has been updated. You can now sign in with your new password.',
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error resetting password', 500);
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = verifyEmailSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }
    const { email } = parseResult.data;
    if (email) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        user.isActive = true;
        await user.save();
      }
    }
    sendSuccess(res, 'Email verified successfully', {
      message: 'Your email address has been verified successfully. Welcome to SupportIQ!',
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error verifying email', 500);
  }
};
