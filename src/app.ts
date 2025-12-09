import 'reflect-metadata';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import userRouter from './routes/users.route.js';
import authRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/auth/users', userRouter);

app.use(errorHandler);
export default app;
