import { Router } from 'express';
import usersControllers from '../controllers/users/user.controller.js';
import validateRequest from '../middleware/validateRequest.js';
import { userRegistrationsSchema } from '../validators/users.validator.js';
import auth from '../middleware/auth.js';
const userRouter = Router();

const { registerController, getUserController } = usersControllers;

userRouter.post(
   '/register',
   validateRequest(userRegistrationsSchema),
   registerController
);
userRouter.get('/get-user-data', auth, getUserController);

export default userRouter;
