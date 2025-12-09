import z from 'zod';

export const userRegistrationsSchema = z.object({
   firstName: z.string().trim().min(1, 'firstName cannot be empty'),
   lastName: z.string().trim(),
   email: z.email().trim(),
   password: z.string().trim(),
});

export const userLoginSchema = z.object({
   email: z.email().trim(),
   password: z.string().trim(),
});
