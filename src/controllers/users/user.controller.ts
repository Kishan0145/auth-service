import type { NextFunction, Request, Response } from 'express';
import UserService from '../../services/users/user.service.js';
import { successResponse } from '../../utils/index.js';
import type { RegisterUserInterface } from '../../types/index.js';
import { USER_ROLES } from '../../constants/user.constant.js';
import createHttpError from 'http-errors';

const registerController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { firstName, lastName, email, password } =
         req.body as RegisterUserInterface;

      const payload = {
         firstName,
         lastName,
         email,
         role: USER_ROLES.CUSTOMER,
         password,
      };
      const user = await UserService.createUser(payload);
      return successResponse(201, res, user);
   } catch (e) {
      next(e);
   }
};

const getCurrentUserController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const user = await UserService.getUserById(req.user.id);
      return successResponse(200, res, user);
   } catch (e) {
      next(e);
   }
};

type filterType = {
   id: number;
   restaurantId?: number | null;
   roles?: string[];
};
const getSingleUserController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const filterObj: filterType = {} as filterType;
      const id = req.params.id;
      if (!id) {
         throw createHttpError(400, 'Id is required');
      }
      filterObj['id'] = parseInt(id);
      if (req.user.restaurantId) {
         filterObj['restaurantId'] = req.user.restaurantId;
      }
      const user = await UserService.getSingleUser(filterObj);
      return successResponse(200, res, user);
   } catch (e) {
      next(e);
   }
};

const updateUserController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { firstName, lastName, email, role } =
         req.body as RegisterUserInterface;
      const id = req.params.id;
      if (!id) {
         throw createHttpError(400, 'Id is required');
      }
      const user = await UserService.getUserById(parseInt(id));
      if (!user) {
         throw createHttpError(400, 'Invalid user id');
      }
      const payload = {
         firstName,
         lastName,
         email,
      };

      if (
         req.user.role == USER_ROLES.ADMIN ||
         req.user.role == USER_ROLES.SUPER_ADMIN
      ) {
         payload['role' as keyof typeof payload] = role!;
      } else if (role) {
         throw createHttpError(403, 'Access Denied, You cannot update role');
      }

      const updatedUser = await UserService.updateUser(parseInt(id), payload);
      return successResponse(200, res, updatedUser);
   } catch (e) {
      next(e);
   }
};

const usersControllers = {
   registerController,
   getCurrentUserController,
   getSingleUserController,
   updateUserController,
};

export default usersControllers;
