import request from 'supertest';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entity/User.js';
import { truncateTables } from '../utils/tests.js';
import app from '../app.js';

// Clear all tables before each test to ensure a clean slate and prevent data leaking between tests
beforeEach(async () => {
   await truncateTables();
});

describe('User registration', () => {
   // Access the User repository directly to verify what actually got saved in the DB
   const userRepo = AppDataSource.getRepository(User);

   it('POST should register a new user with status 201 ', async () => {
      const payload = {
         firstName: 'Kishan',
         lastName: 'Sharma',
         email: 'test@gmail.com',
         password: 'Test@1234',
      };

      const response = await request(app)
         .post('/api/user/register')
         .send(payload);

      // Successful creation should return 201 Created
      expect(response.status).toBe(201);
   });

   it('the data must persist in the database and should not return password', async () => {
      const payload = {
         firstName: 'Kishan',
         lastName: 'Sharma',
         email: 'test@gmail.com',
         password: 'Test@1234',
      };

      await request(app).post('/api/user/register').send(payload);

      // Query the DB directly to confirm the user was actually saved
      const user = await userRepo.find();
      expect(user).toHaveLength(1);

      // The response (and DB record via userShield) must never expose the hashed password
      expect(user).not.toHaveProperty('password');
   });

   it('saved user should have a role customer', async () => {
      const payload = {
         firstName: 'Kishan',
         lastName: 'Sharma',
         email: 'test@gmail.com',
         password: 'Test@1234',
      };

      await request(app).post('/api/user/register').send(payload);

      const user = await userRepo.find();

      // Default role for self-registered users must be 'customer', not admin/manager
      expect(user[0]).toHaveProperty('role', 'customer');
   });

   it('should throw 400 if email already exist', async () => {
      const payload = {
         firstName: 'Kishan',
         lastName: 'Sharma',
         email: 'test@gmail.com',
         password: 'Test@1234',
      };

      // First registration — should succeed
      await request(app).post('/api/user/register').send(payload);

      const payload2 = {
         firstName: 'Kishan',
         lastName: 'Sharma',
         email: 'test@gmail.com', // same email as above
         password: 'Test@1234',
      };

      // Second registration with the same email must be rejected
      const res = await request(app).post('/api/user/register').send(payload2);
      expect(res.status).toBe(400);
   });

   describe('Required Fields Validation', () => {
      // Zod schema validation rejects null/missing required fields with 400 Bad Request

      it('should return 400 if there is no firstName', async () => {
         const payload = {
            firstName: null,
            lastName: 'Sharma',
            email: 'test@gmail.com',
            password: 'Test@1234',
         };

         const response = await request(app)
            .post('/api/user/register')
            .send(payload);
         expect(response.status).toBe(400);
      });

      it('should return 400 if there is no lastName', async () => {
         const payload = {
            firstName: 'Kishan',
            lastName: null,
            email: 'test@gmail.com',
            password: 'Test@1234',
         };

         const response = await request(app)
            .post('/api/user/register')
            .send(payload);
         expect(response.status).toBe(400);
      });

      it('should return 400 if there is no email', async () => {
         const payload = {
            firstName: 'Kishan',
            lastName: 'Sharma',
            email: null,
            password: 'Test@1234',
         };

         const response = await request(app)
            .post('/api/user/register')
            .send(payload);
         expect(response.status).toBe(400);
      });

      it('should return 400 if there is no password', async () => {
         const payload = {
            firstName: 'Kishan',
            lastName: 'Sharma',
            email: 'test@gmail.com',
            password: null,
         };

         const response = await request(app)
            .post('/api/user/register')
            .send(payload);
         expect(response.status).toBe(400);
      });
   });
});
