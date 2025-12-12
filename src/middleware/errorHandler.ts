import type { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.js';

interface HttpError extends Error {
   statusCode?: number;
}
const errorHandler = (
   err: HttpError,
   req: Request,
   res: Response,
   _next: NextFunction
) => {
   logger.error({
      message: err.message,
      stack: err.stack,
      path: req.url,
      method: req.method,
   });
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';

   return res.status(statusCode).json({
      success: false,
      message: message,
      errors: [],
   });
};

export default errorHandler;
