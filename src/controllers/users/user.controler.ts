import type { Request, Response } from 'express';

const registerController = (req: Request, res: Response) => {
   return res.status(201).json({});
};

const usersControllers = {
   registerController,
};

export default usersControllers;
