import express from 'express';
import authController from '../controllers/auth/auth.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { userLoginSchema } from '../validators/users.validator.js';

const authRouter = express.Router();
const { loginController } = authController;

authRouter.post('/login', validateRequest(userLoginSchema), loginController);

export default authRouter;
