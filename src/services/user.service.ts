import createHttpError from 'http-errors';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entity/User.js';
import type { RegisterUserInterface } from '../types/index.js';
import { hashPassword } from '../utils/password.js';

const createUser = async (payload: RegisterUserInterface) => {
   const { firstName, lastName, email, password } = payload;
   const userRepo = AppDataSource.getRepository(User);
   const isEmailPresent = await userRepo.findOne({ where: { email: email } });
   console.log('SDSD-->', isEmailPresent);
   if (isEmailPresent) {
      throw createHttpError(400, 'Email is already in use.');
   }
   const user = new User();

   user.firstName = firstName;
   user.lastName = lastName;
   user.email = email;
   user.password = await hashPassword(password);

   await userRepo.save(user);
   delete (user as Partial<Pick<User, 'password'>>).password;
   return user;
};

const UserService = {
   createUser,
};
export default UserService;
