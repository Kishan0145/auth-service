import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
   // synchronize auto-creates/updates the schema from entities — only safe in test.
   // Dev and prod use explicit migrations instead to avoid accidental data loss.
   synchronize: NODE_ENV == 'test',
   logging: false,
   entities: ['src/entity/**/*{.js,.ts}'],
   // Migrations don't run in test (synchronize handles schema there), so pass an
   // empty array to avoid the same glob-based dynamic import problem described above.
   migrations: NODE_ENV === 'test' ? [] : ['src/migration/**/*{.js,.ts}'],
   subscribers: [],
});
