import winston from 'winston';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  transports: [new winston.transports.File({ filename: 'request.log' })],
});

export const errorLogger = expressWinston.errorLogger({
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),

  transports: [new winston.transports.File({ filename: 'errors.log' })],
});
