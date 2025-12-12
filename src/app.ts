import 'reflect-metadata';
import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import restaurantRoute from './routes/restaurant.route.js';

const app = express();
app.use(express.json());

app.use('/api', authRouter);
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRoute);

app.use(errorHandler);
export default app;
