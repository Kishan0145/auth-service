import { Router } from 'express';
import validateRequest from '../middleware/validateRequest.js';
import { restaurantRegistrationSchema } from '../validators/restaurant.validator.js';
import auth from '../middleware/auth.js';
import userPermission from '../middleware/userPermission.js';
import restaurantController from '../controllers/restaurants/restaurant.controller.js';
import { userRegistrationsSchema } from '../validators/users.validator.js';

const { registerController, manageUserController } = restaurantController;
const restaurantRoute = Router();
restaurantRoute.post(
   '/register',
   validateRequest(restaurantRegistrationSchema),
   auth,
   userPermission(),
   registerController
);
restaurantRoute.post(
   '/user-register',
   validateRequest(userRegistrationsSchema),
   auth,
   userPermission(),
   manageUserController
);
export default restaurantRoute;
