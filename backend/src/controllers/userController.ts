import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { comparePassword, hashPassword } from '../utils/passwordUtils';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errorTypes';

const prisma = new PrismaClient();

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = userSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
