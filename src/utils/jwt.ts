import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Config } from '../config/index.js';

const filePathName = fileURLToPath(import.meta.url);
const __dirname = dirname(filePathName);
const keyPath = join(__dirname, '../certs/private.pem');

export const generateAccessToken = (payload: JwtPayload) => {
   const privateKey = readFileSync(keyPath);
   const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: 15 * 60,
      issuer: 'auth-service',
   };
   const token = jwt.sign(payload, privateKey, options);
   return token;
};

export const generateRefreshToken = (payload: JwtPayload) => {
   const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: '1d',
      issuer: 'auth-service',
   };
   const token = jwt.sign(payload, Config.JWT_SECRET!, options);
   return token;
};
