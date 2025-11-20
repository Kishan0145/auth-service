import { config } from 'dotenv';
config();

const { PORT, LOG_LEVEL, NODE_ENV } = process.env;
export const Config = {
   PORT,
   LOG_LEVEL,
   NODE_ENV,
};
