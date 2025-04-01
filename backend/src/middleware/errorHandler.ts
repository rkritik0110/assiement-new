// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { BaseError } from '../utils/errorTypes';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  // Handle ZodError (validation errors)
  if (error instanceof ZodError) {
    const validationErrors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: validationErrors,
    });
    return;
  }

  // Handle custom errors
  if (error instanceof BaseError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
    return;
  }

  // Handle other errors
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};