import { AppDataSource } from '../config/data-source.js';

// Each suite gets its own worker process, so we initialize and destroy the DB
// connection per suite — no shared state across suites.
beforeAll(async () => {
   await AppDataSource.initialize();
});

afterAll(async () => {
   await AppDataSource.destroy();
});
