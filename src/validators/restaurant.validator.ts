import z from 'zod';
import { RESTAURANTS_TYPES } from '../constants/user.constant.js';

export const restaurantRegistrationSchema = z.object({
   name: z.string().trim().min(1, 'Name can"t be empty'),
   address: z.string().trim().min(1, 'Address can"t be empty'),
   type: z
      .number()
      .refine((val) => Object.values(RESTAURANTS_TYPES).includes(val), {
         message: 'Invalid restaurant type',
      }),
   phone: z
      .string()
      .trim()
      .min(10, 'Phone must be at least 10 characters long'),
   email: z.email().trim(),
});
