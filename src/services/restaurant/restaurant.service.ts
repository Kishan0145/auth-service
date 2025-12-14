import createHttpError from 'http-errors';
import { AppDataSource } from '../../config/data-source.js';
import { Restaurant } from '../../entity/Restaurant.js';
import type { RegisterRestaurantInterface } from '../../types/index.js';

const restaurantRepo = AppDataSource.getRepository(Restaurant);
const create = async (payload: RegisterRestaurantInterface) => {
   const { name, address, email, phone, type } = payload;

   const isEmailExist = await getRestaurantByEmail(email);
   if (isEmailExist) {
      throw createHttpError(400, 'Email is already in use.');
   }

   const isPhoneExist = await getRestaurantByPhone(phone);
   if (isPhoneExist) {
      throw createHttpError(400, 'Phone is number already in use.');
   }

   const restaurant = new Restaurant();
   restaurant.name = name;
   restaurant.address = address;
   restaurant.email = email;
   restaurant.phone = phone;
   restaurant.type = type;
   const res = await restaurantRepo.save(restaurant);
   return res;
};

const getRestaurantById = async (id: number) => {
   const restaurant = await restaurantRepo.findOneBy({ id: id });
   if (!restaurant) {
      throw createHttpError(400, 'Invalid Restaurant Id');
   }
   return restaurant;
};

const getRestaurantByEmail = async (email: string) => {
   const restaurant = await restaurantRepo.findOneBy({ email: email });
   if (!restaurant) {
      throw createHttpError(400, 'Invalid Restaurant email');
   }
   return restaurant;
};

const getRestaurantByPhone = async (phone: string) => {
   const restaurant = await restaurantRepo.findOneBy({ phone: phone });
   if (!restaurant) {
      throw createHttpError(400, 'Invalid Restaurant email');
   }
   return restaurant;
};

const restaurantService = {
   create,
   getRestaurantById,
};

export default restaurantService;
