import app from '../../app.js';
import request from 'supertest';

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
});
