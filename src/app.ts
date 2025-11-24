import 'reflect-metadata';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/users.route..js';

const app = express();
app.use('/auth/users', userRoutes);

app.use(errorHandler);
export default app;
