export interface RegisterUserInterface {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   role: string;
}

export interface loginPayloadInterface {
   email: string;
   password: string;
}

export interface RegisterRestaurantInterface {
   name: string;
   address: string;
   type: number;
   phone: string;
   email: string;
}

// @typescript-eslint/no-namespace
declare global {
   namespace Express {
      interface Request {
         user: {
            id: number;
            role: string;
         };
      }
   }
}
