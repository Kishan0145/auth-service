import { config } from 'dotenv';
import { join } from 'path';

const path = join(
   import.meta.dirname,
   `../../.env.${process.env.NODE_ENV || 'dev'}`
);
config({ path: path });

const { PORT, LOG_LEVEL, NODE_ENV } = process.env;
export const Config = {
   PORT,
   LOG_LEVEL,
   NODE_ENV,
};
