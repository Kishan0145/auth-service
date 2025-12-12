import request from 'supertest';
import { AppDataSource } from '../config/data-source.js';
import { truncateTables } from '../utils/tests.js';
import app from '../app.js';
import { RESTAURANTS_TYPES } from '../constants/user.constant.js';

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

// describe("Restaurant Testing",()=>{
//    it("POST api/restaurant/register, should return 201 status code",async ()=>{
//          const payload = {
// name: "The Food Place",
// address: "123 Main St, Cityville",
// type:RESTAURANTS_TYPES.VEG,
// email: "res@gmail.com",
// phone:'1234567899'
//          }

//          const response = await request(app).post('/api/restaurant/register').send(payload)
//          console.log(response)
//          expect(response.status).toBe(201)
//    })

// })
