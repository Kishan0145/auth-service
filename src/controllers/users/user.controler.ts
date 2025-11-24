import type { NextFunction, Request, Response } from 'express';

const registerController = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      return res.status(201).json({});
   } catch (e) {
      next(e);
   }
};

const usersControllers = {
   registerController,
};

export default usersControllers;
