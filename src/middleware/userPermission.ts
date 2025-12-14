import type { NextFunction, Request, Response } from 'express';
import {
   ROLE_WISE_PERMISSIONS,
   USER_ROLES,
} from '../constants/user.constant.js';
import createHttpError from 'http-errors';

const userPermission = (permission: string) => {
   // const roles = [USER_ROLES.SUPER_ADMIN, ...allowedRoles];
   return (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.user.role;
      if (
         !ROLE_WISE_PERMISSIONS[
            userRole as keyof typeof ROLE_WISE_PERMISSIONS
         ]?.includes(permission)
      ) {
         throw createHttpError(403, 'Access Denied');
      }
      if (userRole == USER_ROLES.ADMIN || userRole == USER_ROLES.MANAGER) {
         if (!req.user.restaurantId) {
            throw createHttpError(
               400,
               'Access denied, No restaurant id is present'
            );
         }
      }
      next();
   };
};

export default userPermission;
