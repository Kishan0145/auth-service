import createHttpError from 'http-errors';
import { AppDataSource } from '../../config/data-source.js';
import { RefreshTokens, User } from '../../entity/User.js';
import type { loginPayloadInterface } from '../../types/index.js';
import { verifyPassword } from '../../utils/password.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';
import { userShield } from '../../utils/index.js';
import { Config } from '../../config/index.js';

const userRepo = AppDataSource.getRepository(User);
const refreshTokenRepo = AppDataSource.getRepository(RefreshTokens);

const login = async (payload: loginPayloadInterface) => {
   const { email, password } = payload;
   const normalizedEmail = email.toLowerCase();
   const user = await userRepo.findOneBy({ email: normalizedEmail });
   if (!user) {
      throw createHttpError(401, 'User does not exist, kindly register first.');
   }

   const isValidPassword = await verifyPassword(password, user.password);
   if (!isValidPassword) {
      throw createHttpError(401, 'Either email or password is invalid.');
   }

   const tokenPayload = {
      id: user.id,
      role: user.role,
      type: 'access',
   };

   const accessToken = generateAccessToken(tokenPayload);
   const refreshToken = generateRefreshToken({
      ...tokenPayload,
      type: 'refresh',
   });
   const validity = Config.REFRESH_TOKEN_VALIDITY
      ? parseInt(Config.REFRESH_TOKEN_VALIDITY)
      : 86400000;
   const saveData = {
      user: user,
      refreshToken: refreshToken,
      expiresAt: Date.now() + validity,
   };
   await refreshTokenRepo.save(saveData);

   const returnData = {
      userData: userShield(user),
      accessToken,
      refreshToken,
   };
   return returnData;
};

const AuthService = {
   login,
};

export default AuthService;
