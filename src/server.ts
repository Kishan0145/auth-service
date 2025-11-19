import app from './app.js';
import { Config } from './config/index.js';

const startServer = () => {
   try {
      app.listen(Config.PORT, () => {
         console.log(`Server listening at port ${Config.PORT}`);
      });
   } catch (e) {
      console.log('server error: ', e);
   }
};

startServer();
