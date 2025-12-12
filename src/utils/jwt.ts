import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Config } from '../config/index.js';

const filePathName = fileURLToPath(import.meta.url);
const __dirname = dirname(filePathName);
const privateKeyPath = join(__dirname, '../certs/private.pem');
const publicKeyPath = join(__dirname, '../certs/public.pem');

export const generateAccessToken = (payload: JwtPayload) => {
   const privateKey = readFileSync(privateKeyPath);
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
      const publicKey = readFileSync(publicKeyPath);
      const tokenData = jwt.verify(token, publicKey);
      return tokenData as JwtPayload;
   } catch (_e) {
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
