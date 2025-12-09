import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { verifyAccessToken } from '../utils/jwt.js';
import type { JwtPayload } from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.header('authorization');
   const accessToken = authHeader?.split(' ')[1];
   try {
      if (!accessToken) {
         throw createHttpError(400, 'Auth header is missing');
      }
      const tokenData: JwtPayload | false = verifyAccessToken(accessToken);
      if (!tokenData) {
         throw createHttpError(401, 'Invalid Access Token');
      }
      req.user = {
         id: tokenData.id,
         role: tokenData.role,
      };
      next();
   } catch (e) {
      next(e);
   }
};

export default auth;
