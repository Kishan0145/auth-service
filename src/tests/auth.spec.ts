import request from 'supertest';
import app from '../app.js';
import { truncateTables } from '../utils/tests.js';

// Clear all tables before each test to prevent data from a previous test affecting the next
beforeEach(async () => {
   await truncateTables();
});

describe('Should login and logout user', () => {
   // it('should return status 200 on login ', async () => {
   //    // First register a user so there is someone to log in as
   //    const resisterPayload = {
   //       firstName: 'Test',
   //       lastName: 'User',
   //       email: 'test2@gmail.com',
   //       password: 'Test@1234',
   //    };
   //    const registerRes = await request(app)
   //       .post('/api/user/register')
   //       .send(resisterPayload);

   //    // Ensure registration succeeded before attempting login
   //    expect(registerRes.status).toBe(201);

   //    const payload = {
   //       email: 'test2@gmail.com',
   //       password: 'Test@1234',
   //    };

   //    const response = await request(app).post('/api/login').send(payload);
   //    // Valid credentials must return 200 with access + refresh tokens in the response
   //    expect(response.status).toBe(200);
   // });

   it('should return 401 if user does not exist', async () => {
      const payload = {
         email: 'notKnown@gmail.com', // no user registered with this email
         password: 'Test@1234',
      };

      const response = await request(app).post('/api/login').send(payload);

      // Unregistered email must be rejected with 401 Unauthorized, not 404,
      // to avoid leaking whether an email exists in the system
      expect(response.status).toBe(401);
   });
});
