import winston from 'winston';
import { Config } from './index.js';
import 'winston-daily-rotate-file';

const fileRotateTransportForErrors = new winston.transports.DailyRotateFile({
   filename: 'logs/app-error-%DATE%.log',
   datePattern: 'YYYY-MM-DD',
   level: 'error',
   maxSize: '20m',
   maxFiles: '14d',
});

const fileRotateTransportForCombine = new winston.transports.DailyRotateFile({
   filename: 'logs/app-combine-%DATE%.log',
   datePattern: 'YYYY-MM-DD',
   maxSize: '20m',
   maxFiles: '14d',
});

const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
   silent: !(Config.NODE_ENV === 'test'),
   level: Config.LOG_LEVEL || 'info',
   format: combine(timestamp(), json()),
   transports: [fileRotateTransportForErrors, fileRotateTransportForCombine],
});

export default logger;
