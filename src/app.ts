import 'reflect-metadata';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/users.route.js';
import { validateRequest } from './middleware/validateRequest.js';
import { userRegistrationsSchema } from './validators/users.validator.js';
import authRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/auth/users', validateRequest(userRegistrationsSchema), userRoutes);

app.use(errorHandler);
export default app;
