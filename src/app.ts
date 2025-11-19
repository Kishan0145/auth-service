import express from 'express';

const app = express();

app.get('/', (req, res) => {
   res.json('Hello world');
});

export default app;
