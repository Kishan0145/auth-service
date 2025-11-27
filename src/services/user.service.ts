import { AppDataSource } from '../config/data-source.js';
import { User } from '../entity/User.js';
import type { RegisterUserInterface } from '../types/index.js';
import { hashPassword } from '../utils/password.js';

const createUser = async (payload: RegisterUserInterface) => {
   const userRepo = AppDataSource.getRepository(User);
   const user = new User();

   user.firstName = payload.firstName;
   user.lastName = payload.lastName;
   user.email = payload.email;
   user.password = await hashPassword(payload.password);

   await userRepo.save(user);
   delete (user as Partial<Pick<User, 'password'>>).password;
   return user;
};

const UserService = {
   createUser,
};
export default UserService;
