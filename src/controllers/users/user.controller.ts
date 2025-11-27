import type { NextFunction, Request, Response } from 'express';
import UserService from '../../services/user.service.js';

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
      return res.status(201).json(user);
   } catch (e) {
      next(e);
   }
};

const usersControllers = {
   registerController,
};

export default usersControllers;
