import type { NextFunction, Request, Response } from 'express';
import UserService from '../../services/users/user.service.js';
import { successResponse } from '../../utils/index.js';

const registerController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { firstName, lastName, email, password } = req.body;
      const payload = {
         firstName,
         lastName,
         email,
         password: password?.toString(),
      };
      const user = await UserService.createUser(payload);
      return successResponse(201, res, user);
   } catch (e) {
      next(e);
   }
};

const usersControllers = {
   registerController,
};

export default usersControllers;
