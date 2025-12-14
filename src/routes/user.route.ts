import { Router } from 'express';
import usersControllers from '../controllers/users/user.controller.js';
import validateRequest from '../middleware/validateRequest.js';
import { userRegistrationsSchema } from '../validators/users.validator.js';
import auth from '../middleware/auth.js';
import userPermission from '../middleware/userPermission.js';
import { PERMISSIONS, USER_ROLES } from '../constants/user.constant.js';
const userRouter = Router();

const {
   registerController,
   getCurrentUserController,
   getSingleUserController,
   updateUserController,
} = usersControllers;

userRouter.post(
   '/register',
   validateRequest(userRegistrationsSchema),
   registerController
);
userRouter.get('/get-current-user-data', auth, getCurrentUserController);
userRouter.get('/:id', auth, getSingleUserController);
userRouter.put(
   '/update/:id',
   validateRequest(userRegistrationsSchema),
   auth,
   userPermission(PERMISSIONS.UPDATE_USER),
   updateUserController
);

export default userRouter;
