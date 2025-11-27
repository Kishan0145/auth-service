import { AppDataSource } from '../config/data-source.js';

export const truncateTables = async () => {
   const entities = AppDataSource.entityMetadatas;
   for (const entity of entities) {
      const connection = AppDataSource.getRepository(entity.name);
      await connection.clear();
   }
};
