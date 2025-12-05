import createHttpError from 'http-errors';
import { AppDataSource } from '../../config/data-source.js';
import { User } from '../../entity/User.js';
import type { loginPayloadInterface } from '../../types/index.js';
import { verifyPassword } from '../../utils/password.js';
import { generateAccessToken } from '../../utils/jwt.js';
import { userShield } from '../../utils/index.js';

const userRepo = AppDataSource.getRepository(User);
const login = async (payload: loginPayloadInterface) => {
   const { email, password } = payload;
   const user = await userRepo.findOneBy({ email: email });
   if (!user) {
      throw createHttpError(401, 'User does not exist, kindly register first.');
   }

   if (!verifyPassword(password, user.password)) {
      throw createHttpError(401, 'Either email or password is invalid.');
   }

   const tokenPayload = {
      id: user.id,
      role: user.role,
   };

   const token = generateAccessToken(tokenPayload);
   const returnData = {
      userData: userShield(user),
      token,
   };
   return returnData;
};

const AuthService = {
   login,
};

export default AuthService;
