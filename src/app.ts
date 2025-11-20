import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.get('/', (req, res) => {
   res.json('Hello world');
});


app.use(errorHandler)
export default app;
