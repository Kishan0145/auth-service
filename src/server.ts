import { Config } from './config/index.js';

const testFunction = (name: string) => {
   console.log(`abc ${name}, ${Config.PORT}!`);
};

testFunction('world');
