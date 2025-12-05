import express from 'express';
import authController from '../controllers/auth/auth.controller.js';

const authRouter = express.Router();
const { loginController } = authController;

authRouter.post('/login', loginController);

export default authRouter;
