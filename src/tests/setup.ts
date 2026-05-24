import { AppDataSource } from '../config/data-source.js';

beforeAll(async () => {
   if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
   }
}, 30000);
