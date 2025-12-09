import { userShield } from './../../utils/index.js';
import createHttpError from 'http-errors';
import type { RegisterUserInterface } from '../../types/index.js';
import { AppDataSource } from '../../config/data-source.js';
import { User } from '../../entity/User.js';
import { hashPassword } from '../../utils/password.js';

const userRepo = AppDataSource.getRepository(User);
const createUser = async (payload: RegisterUserInterface) => {
   const { firstName, lastName, email, password } = payload;
   const isEmailPresent = await userRepo.findOne({ where: { email: email } });
   if (isEmailPresent) {
      throw createHttpError(400, 'Email is already in use.');
   }
   const user = new User();

   user.firstName = firstName;
   user.lastName = lastName;
   user.email = email;
   user.password = await hashPassword(password);

   await userRepo.save(user);
   return userShield(user);
};

const getUserById = async (userId: number) => {
   const user = await userRepo.findOneBy({ id: userId });
   if (!user) {
      throw createHttpError(400, 'Invalid user id');
   }
   return userShield(user);
};

const UserService = {
   createUser,
   getUserById,
};
export default UserService;
