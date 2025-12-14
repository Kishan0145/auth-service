import type { NextFunction, Request, Response } from 'express';
import type {
   RegisterRestaurantInterface,
   RegisterUserInterface,
} from '../../types/index.js';
import restaurantService from '../../services/restaurant/restaurant.service.js';
import { successResponse } from '../../utils/index.js';
import { USER_ROLES } from '../../constants/user.constant.js';
import createHttpError from 'http-errors';
import UserService from '../../services/users/user.service.js';

const registerController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { name, email, address, phone, type } =
         req.body as RegisterRestaurantInterface;
      const payload = {
         name,
         email,
         address,
         phone,
         type,
      };
      const returnRes = await restaurantService.create(payload);
      return successResponse(201, res, returnRes);
   } catch (e) {
      next(e);
   }
};

const manageUserController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { firstName, lastName, email, role, restaurantId, password } =
         req.body as RegisterUserInterface;
      const payload = {
         firstName,
         lastName,
         email,
         role,
         restaurantId,
         password,
      };
      const user = await UserService.createUser(
         payload as RegisterUserInterface
      );
      return successResponse(201, res, user);
   } catch (e) {
      next(e);
   }
};

const restaurantController = {
   registerController,
   manageUserController,
};

export default restaurantController;
