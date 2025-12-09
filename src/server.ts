import app from './app.js';
import { AppDataSource } from './config/data-source.js';
import { Config } from './config/index.js';

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
