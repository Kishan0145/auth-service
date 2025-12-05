import type { NextFunction, Request, Response } from 'express';
import AuthService from '../../services/auth/auth.service.js';
import { successResponse } from '../../utils/index.js';

const loginController = async (
   req: Request,
   res: Response,
   _next: NextFunction
) => {
   try {
      const { email, password } = req.body;
      const payload = {
         email,
         password,
      };
      const returnData = await AuthService.login(payload);
      return successResponse(200, res, returnData);
   } catch (e) {
      _next(e);
   }
};

const authController = {
   loginController,
};

export default authController;
