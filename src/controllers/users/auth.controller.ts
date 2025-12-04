import type { NextFunction, Request, Response } from 'express';

const loginController = (req: Request, res: Response, _next: NextFunction) => {
   return res.status(200).json({});
};

const authController = {
   loginController,
};

export default authController;
