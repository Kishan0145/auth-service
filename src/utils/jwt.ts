import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Config } from '../config/index.js';
import createHttpError from 'http-errors';

const filePathName = fileURLToPath(import.meta.url);
const __dirname = dirname(filePathName);
// const privateKeyPath = Config.PRIVATE_KEY ;
const publicKeyPath = join(__dirname, '../../public.pem');

export const generateAccessToken = (payload: JwtPayload) => {
   const privateKey = Config.PRIVATE_KEY;
   if (!privateKey) {
      throw createHttpError(
         500,
         'Private key is not defined in environment variables'
      );
   }
   const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: 15 * 60, // 15 min
      issuer: 'auth-service',
   };
   const token = jwt.sign(payload, privateKey, options);
   return token;
};

export const verifyAccessToken = (token: string) => {
   try {
      if (!publicKeyPath) {
         throw createHttpError(
            500,
            'Public key path is not defined in environment variables'
         );
      }
      const publicKey = readFileSync(publicKeyPath);
      const tokenData = jwt.verify(token, publicKey);
      return tokenData as JwtPayload;
   } catch (_e) {
      // logger.error(e)
      return false;
   }
};

export const generateRefreshToken = (payload: JwtPayload) => {
   const options: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '1d',
      issuer: 'auth-service',
   };
   const token = jwt.sign(payload, Config.JWT_SECRET!, options);
   return token;
};
