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
    venueManager: z
      .boolean()
      .optional()
      .default(false),
  })
  .refine(
    (d) => d.password === d.confirmPassword,
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

export type RegisterFormValues = z.input<
  typeof registerSchema
>;

export type RegisterPayload = Omit<
  RegisterFormValues,
  'confirmPassword'
>;

export type LoginFormValues = z.infer<
  typeof loginSchema
>;
export type LoginPayload = Omit<
  LoginFormValues,
  'confirmPassword'
>;
