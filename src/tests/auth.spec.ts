import request from 'supertest';
import app from '../app.js';

describe('Should login and logout user', () => {
   it('should return status 200 on login ', async () => {
      const payload = {
         email: 'test@gmail.com',
         password: 'Test@1234',
      };

      const response = await request(app).post('/auth/login').send(payload);

      expect(response.status).toBe(200);
   });
});
