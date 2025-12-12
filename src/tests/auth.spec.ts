import request from 'supertest';
import app from '../app.js';
import { AppDataSource } from '../config/data-source.js';
import { truncateTables } from '../utils/tests.js';

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
describe('Should login and logout user', () => {
   it('should return status 200 on login ', async () => {
      const resisterPayload = {
         firstName: 'Test',
         lastName: 'User',
         email: 'test2@gmail.com',
         password: 'Test@1234', // Use proper password hashing
         role: 'user',
      };
      const registerRes = await request(app)
         .post('/api/user/register')
         .send(resisterPayload);
      expect(registerRes.status).toBe(201);

      const payload = {
         email: 'test2@gmail.com',
         password: 'Test@1234',
      };
      const response = await request(app).post('/api/login').send(payload);
      expect(response.status).toBe(200);
   });
   it('should return 401 if user does not exist', async () => {
      const payload = {
         email: 'notKnown@gmail.com',
         password: 'Test@1234',
      };

      const response = await request(app).post('/api/login').send(payload);

      expect(response.status).toBe(401);
   });
});
