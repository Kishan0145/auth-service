import app from './app.js';
import { AppDataSource } from './config/data-source.js';
import { Config } from './config/index.js';
import logger from './config/logger.js';

process.on('uncaughtException', (error: unknown) => {
   logger.error('=== UNCAUGHT EXCEPTION ===');
   logger.error('Type:', typeof error);
   logger.error('Value:', error);
   logger.error('Is Error?:', error instanceof Error);
   if (error instanceof Error) {
      logger.error('Stack:', error.stack);
   }
   process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
   logger.error('=== UNHANDLED REJECTION ===');
   logger.error('Type:', typeof reason);
   logger.error('Value:', reason);
   logger.error('Is Error?:', reason instanceof Error);
   if (reason instanceof Error) {
      logger.error('Stack:', reason.stack);
   }
   process.exit(1);
});

const startServer = async () => {
   try {
      await AppDataSource.initialize();
      app.listen(Config.PORT, async () => {
         console.log(`Server listening at port ${Config.PORT}`);
      });
   } catch (e) {
      console.log('server error: ', e);
   }
};

startServer();
