import { AppDataSource } from '../../config/data-source.js';
import { Restaurant } from '../../entity/Restaurant.js';
import type { RegisterRestaurantInterface } from '../../types/index.js';

const restaurantRepo = AppDataSource.getRepository(Restaurant);
const create = async (payload: RegisterRestaurantInterface) => {
   const { name, address, email, phone, type } = payload;
   const restaurant = new Restaurant();
   restaurant.name = name;
   restaurant.address = address;
   restaurant.email = email;
   restaurant.phone = phone;
   restaurant.type = type;
   const res = await restaurantRepo.save(restaurant);
   return res;
};

const restaurantService = {
   create,
};

export default restaurantService;
