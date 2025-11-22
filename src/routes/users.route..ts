import { Router } from 'express';
import usersControllers from '../controllers/users/user.controler.js';
const userRoutes = Router();

const { registerController } = usersControllers;

userRoutes.post('/register', registerController);

export default userRoutes;
