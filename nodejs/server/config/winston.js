/**
 * Create the winston logger instance
 */

import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;
