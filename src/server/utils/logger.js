const winston = require('winston');
require('winston-daily-rotate-file');

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: '%DATE%.log',
      dirname: `${__dirname}/../../../logs/`,
      datePattern: 'YYYY-MM-DD',
      prepend: true,
      level: process.env.ENV === 'development' ? 'debug' : 'info',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export default logger;
