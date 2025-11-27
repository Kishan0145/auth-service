import app from '../../app.js';
import request from 'supertest';
import { AppDataSource } from '../../config/data-source.js';
import { truncateTables } from '../../utils/tests.js';
import { User } from '../../entity/User.js';

beforeAll(async () => {
   if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
   }
});

beforeEach(async () => {
   await truncateTables();
});

afterAll(async () => {
   if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
   }
});

describe('User registration', () => {
   it('POST should register a new user with status 201 ', async () => {
      const payload = {
         firstName: 'Kishan',
         lastName: 'Sharma',
         email: 'test@gmail.com',
         password: 'Test@1234',
      };

      const response = await request(app)
         .post('/auth/users/register')
         .send(payload);
      expect(response.status).toBe(201);
   });

   it('the data must persist in the database and should not return password', async () => {
      const payload = {
         firstName: 'Kishan',
         lastName: 'Sharma',
         email: 'test@gmail.com',
         password: 'Test@1234',
      };

      await request(app).post('/auth/users/register').send(payload);

      const user = await AppDataSource.getRepository(User).find();
      expect(user).toHaveLength(1);
      expect(user).not.toHaveProperty('password');
   });
});
