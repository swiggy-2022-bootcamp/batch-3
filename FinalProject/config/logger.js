const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(),winston.format.json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({filename:'info.log',levevl:"info.log"}),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
],
});
 
module.exports=logger;
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }
