import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User.js';
import { Config } from './index.js';

const {
   DB_PORT,
   POSTGRES_PASSWORD,
   POSTGRES_USERNAME,
   POSTGRES_DB,
   DB_HOST,
   NODE_ENV,
} = Config;

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: DB_HOST || 'localhost',
   port: DB_PORT ? parseInt(DB_PORT) : 5432,
   username: POSTGRES_USERNAME || 'postgres',
   password: POSTGRES_PASSWORD || 'password',
   database: POSTGRES_DB || 'db_name',
   synchronize: NODE_ENV == 'dev' || NODE_ENV == 'test',
   logging: false,
   entities: [User],
   migrations: [],
   subscribers: [],
});
