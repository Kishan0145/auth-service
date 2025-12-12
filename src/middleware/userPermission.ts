import type { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../constants/user.constant.js';
import createHttpError from 'http-errors';

const userPermission = (allowedRoles: string[] = []) => {
   const roles = [USER_ROLES.SUPER_ADMIN, ...allowedRoles];
   return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) {
         throw createHttpError(403, 'Access Denied');
      }
      next();
   };
};

export default userPermission;
