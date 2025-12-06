import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = join(__dirname, `../../.env.${process.env.NODE_ENV || 'dev'}`);
config({ path: path });

const {
   PORT,
   LOG_LEVEL,
   NODE_ENV,
   POSTGRES_USERNAME,
   POSTGRES_PASSWORD,
   POSTGRES_DB,
   DB_PORT,
   DB_HOST,
   JWT_SECRET,
   REFRESH_TOKEN_VALIDITY,
} = process.env;
export const Config = {
   PORT,
   LOG_LEVEL,
   NODE_ENV,
   POSTGRES_USERNAME,
   POSTGRES_PASSWORD,
   POSTGRES_DB,
   DB_PORT,
   DB_HOST,
   JWT_SECRET,
   REFRESH_TOKEN_VALIDITY,
};
