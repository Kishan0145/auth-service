import app from './app.js';
import { Config } from './config/index.js';
import logger from './config/logger.js';

const startServer = () => {
   try {
      app.listen(Config.PORT, () => {
         logger.info("Runningss")
         console.log(`Server listening at port ${Config.PORT}`);
      });
   } catch (e) {
      console.log('server error: ', e);
   }
};

startServer();
