import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { sendError } from '../utils/responseHandler';

export const requireRole = (allowedRoles: Array<'customer' | 'admin'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Unauthorized access.', 401);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(res, `Forbidden. Requires one of the following roles: ${allowedRoles.join(', ')}`, 403);
      return;
    }

    next();
  };
};

export const requireAdmin = requireRole(['admin']);
export const requireCustomer = requireRole(['customer']);
