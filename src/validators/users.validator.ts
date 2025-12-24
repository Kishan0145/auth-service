import z from 'zod';
import { USER_ROLES } from '../constants/user.constant.js';

const allowedRoles: string[] = [
   USER_ROLES.ADMIN,
   USER_ROLES.CUSTOMER,
   USER_ROLES.MANAGER,
];
export const userRegistrationsSchema = z.object({
   firstName: z.string().trim().min(1, 'firstName cannot be empty'),
   lastName: z.string().trim().min(1, 'Last Name cannot be empty'),
   email: z.email().trim(),
   password: z
      .string()
      .trim()
      .min(5, 'Password must be at least 6 characters long'),
   role: z
      .string()
      .trim()
      .optional()
      .refine(
         (role) => allowedRoles.some((r) => r == (role || USER_ROLES.CUSTOMER)),
         { message: 'Invalid role' }
      ),
   restaurantId: z.number().optional(),
});

export const userLoginSchema = z.object({
   email: z.email().trim(),
   password: z.string().trim(),
});

export const userUpdateSchema = z.object({
   firstName: z.string().trim().min(1, 'firstName cannot be empty').optional(),
   lastName: z.string().trim().min(1, 'Last Name cannot be empty').optional(),
   email: z.email().trim().optional(),
   role: z
      .string()
      .trim()
      .optional()
      .refine((role) => !role || allowedRoles.some((r) => r == role), {
         message: 'Invalid role',
      }),
   restaurantId: z.number().optional(),
});
