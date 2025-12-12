import type { NextFunction, Request, Response } from 'express';
import AuthService from '../../services/auth/auth.service.js';
import { successResponse } from '../../utils/index.js';
import { Config } from '../../config/index.js';

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
      const { userData, accessToken, refreshToken } =
         await AuthService.login(payload);
      const isProduction = Config.NODE_ENV === 'production';
      res.cookie('token', accessToken, {
         httpOnly: true,
         secure: isProduction,
         sameSite: 'strict',
      });
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: isProduction,
         sameSite: 'strict',
         maxAge: 60 * 60 * 24 * 1000, //1 day in milliseconds
      });
      return successResponse(200, res, { token: accessToken, userData });
   } catch (e) {
      _next(e);
   }
};

const authController = {
   loginController,
};

export default authController;
