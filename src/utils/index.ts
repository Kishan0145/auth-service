import type { Response } from 'express';
import type { User } from '../entity/User.js';

export const userShield = (user: User) => {
   delete (user as Partial<Pick<User, 'password'>>).password;
   return user;
};

export const successResponse = (
   status: number,
   res: Response,
   data: unknown
) => {
   const passStatus: number[] = [200, 201, 202];
   return res.status(status).json({
      statusCode: status,
      data: data,
      status: passStatus.includes(status),
   });
};
