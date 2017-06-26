const winston = require('winston')
require('winston-daily-rotate-file')

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: __dirname+'/../../../logs/log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      level: process.env.ENV === 'development' ? 'debug' : 'info',
    }),
  ],
})

export default logger
