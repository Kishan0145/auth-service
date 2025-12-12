import type { NextFunction, Request, Response } from 'express';
import type { RegisterRestaurantInterface } from '../../types/index.js';
import restaurantService from '../../services/restaurant/restaurant.service.js';
import { successResponse } from '../../utils/index.js';

const registerController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { name, email, address, phone, type } =
         req.body as RegisterRestaurantInterface;
      const payload = {
         name,
         email,
         address,
         phone,
         type,
      };
      const returnRes = await restaurantService.create(payload);
      return successResponse(201, res, returnRes);
   } catch (e) {
      next(e);
   }
};

const restaurantController = {
   registerController,
};

export default restaurantController;
