import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address format'),
  password: z.string().nonempty('Password is required'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty('Full name is required')
      .min(4, 'Name must be at least 4 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain alphabetic characters'),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email address format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z.string().nonempty('Please confirm your password'),
    role: z.enum(['CREATOR', 'USER'], {
      required_error: 'Please select an account type',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });