// schemas.ts
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Min 3 characters'),
    email: z
      .string()
      .toLowerCase()
      .pipe(z.email('Enter a valid email'))
      .refine(
        (e) => e.endsWith('@stud.noroff.no'),
        'Use a stud.noroff.no email'
      ),
    password: z
      .string()
      .min(8, 'Min 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm your password'),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Passwords must match',
    }
  );

export const loginSchema = z
  .object({
    name: z.string().min(3, 'Min 3 characters'),
    email: z
      .string()
      .toLowerCase()
      .pipe(z.email('Enter a valid email'))
      .refine(
        (e) => e.endsWith('@stud.noroff.no'),
        'Use a stud.noroff.no email'
      ),
    password: z
      .string()
      .min(8, 'Min 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm your password'),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Password must match',
    }
  );

export type RegisterFormValues = z.infer<
  typeof registerSchema
>;

export type LoginFormValues = z.infer<
  typeof loginSchema
>;
