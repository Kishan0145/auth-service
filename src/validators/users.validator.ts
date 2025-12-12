import z from 'zod';

export const userRegistrationsSchema = z.object({
   firstName: z.string().trim().min(1, 'firstName cannot be empty'),
   lastName: z.string().trim().min(1, 'Last Name cannot be empty'),
   email: z.email().trim(),
   password: z
      .string()
      .trim()
      .min(5, 'Password must be at least 6 characters long'),
});

export const userLoginSchema = z.object({
   email: z.email().trim(),
   password: z.string().trim(),
});
