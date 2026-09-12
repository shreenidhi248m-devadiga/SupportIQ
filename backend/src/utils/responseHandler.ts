import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && typeof data === 'object' && !Array.isArray(data) && data.token
      ? data
      : { data }),
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors: any = null
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
