import type { NextFunction, Request, Response } from 'express';
import type z from 'zod';

export const validateRequest = (schema: z.ZodObject) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({
            error: false,
            message: 'Validation Failed',
            errors: JSON.parse(result.error?.toString()),
         });
      } else {
         next();
      }
   };
};
