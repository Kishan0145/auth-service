import z from 'zod';

export const userRegistrationsSchema = z.object({
   firstName: z.string().trim().min(1, 'firstName cannot be empty'),
   lastName: z.string().trim().min(1, 'lastName cannot be empty'),
   email: z.string().trim().toLowerCase().email(),
   password: z
      .string()
      .trim()
      .min(8, 'password must be at least 8 characters')
      .regex(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
         'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
});

export const userLoginSchema = z.object({
   email: z.string().trim().toLowerCase().email(),
   password: z.string().trim().min(1, 'password cannot be empty'),
});
