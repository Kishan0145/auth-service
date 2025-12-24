import { Router } from 'express';
import usersControllers from '../controllers/users/user.controller.js';
import validateRequest from '../middleware/validateRequest.js';
import {
   userRegistrationsSchema,
   userUpdateSchema,
} from '../validators/users.validator.js';
import auth from '../middleware/auth.js';
import userPermission from '../middleware/userPermission.js';
import { USER_ROLES } from '../constants/user.constant.js';
const userRouter = Router();

const {
   registerController,
   getCurrentUserController,
   getSingleUserController,
   updateUserController,
   getAllUsersController,
} = usersControllers;

userRouter.post(
   '/register',
   validateRequest(userRegistrationsSchema),
   registerController
);
userRouter.get('/get-current-user-data', auth, getCurrentUserController);
userRouter.get(
   '/:id',
   auth,
   userPermission([USER_ROLES.ADMIN]),
   getSingleUserController
);
userRouter.patch(
   '/update/:id',
   validateRequest(userUpdateSchema),
   auth,
   userPermission([USER_ROLES.ADMIN]),
   updateUserController
);
userRouter.get(
   '/',
   auth,
   userPermission([USER_ROLES.ADMIN]),
   getAllUsersController
);

export default userRouter;
