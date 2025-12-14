import { userShield } from './../../utils/index.js';
import createHttpError from 'http-errors';
import type { RegisterUserInterface } from '../../types/index.js';
import { AppDataSource } from '../../config/data-source.js';
import { User } from '../../entity/User.js';
import { hashPassword } from '../../utils/password.js';
import { USER_ROLES } from '../../constants/user.constant.js';
import restaurantService from '../restaurant/restaurant.service.js';
import type { Restaurant } from '../../entity/Restaurant.js';

const userRepo = AppDataSource.getRepository(User);
const createUser = async (payload: RegisterUserInterface) => {
   const { firstName, lastName, email, password, restaurantId, role } = payload;

   const isEmailPresent = await userRepo.findOne({ where: { email: email } });
   if (isEmailPresent) {
      throw createHttpError(400, 'Email is already in use.');
   }

   let restaurant: Restaurant | null = null;
   if (restaurantId) {
      restaurant = await restaurantService.getRestaurantById(restaurantId);
      if (!restaurant) {
         throw createHttpError(400, 'Invalid Restaurant Id');
      }
   }

   const user = new User();
   user.firstName = firstName;
   user.lastName = lastName;
   user.email = email;
   user.password = await hashPassword(password);
   if (role) {
      user.role = role;
   }
   if (restaurant) {
      user.restaurant = restaurant;
   }
   await userRepo.save(user);
   return userShield(user);
};

const getUserById = async (userId: number) => {
   const user = await userRepo.findOne({
      where: { id: userId },
      relations: ['restaurant'],
   });
   if (!user) {
      throw createHttpError(400, 'Invalid user id');
   }
   return userShield(user);
};

type filterType = {
   id: number;
   restaurantId?: number | null;
   roles?: string[];
};
const getSingleUser = async (filter: filterType) => {
   const queryBuilder = userRepo.createQueryBuilder('user');
   queryBuilder.where('user.id = :id', { id: filter.id });
   if (filter.restaurantId) {
      queryBuilder.andWhere('user.restaurantId = :restaurantId', {
         restaurantId: filter.restaurantId,
      });
   }
   if (filter.roles && filter.roles.length > 0) {
      queryBuilder.andWhere('user.role IN (:...roles)', {
         roles: filter.roles,
      });
   }
   const user = await queryBuilder.getOne();
   if (!user) {
      throw createHttpError(404, 'User not found or access denied');
   }
   return userShield(user);
};

const updateUser = async (
   id: number,
   payload: Omit<RegisterUserInterface, 'password'>
) => {
   const updatedUser = await getUserById(id);
   await userRepo.update({ id: 1 }, { ...payload });
   return userShield(updatedUser);
};

const UserService = {
   createUser,
   getUserById,
   getSingleUser,
   updateUser,
};
export default UserService;
