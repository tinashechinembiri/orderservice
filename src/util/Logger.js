import  winston from 'winston'; 

var options = {
    file: {
      level: 'info',
      filename: `/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
  

const logger = winston.createLogger({
  //  format: winston.format.combine(winston.format.timestamp, winston.format.json()), 
    transports:[
        new (winston.transports.File)(options.file),
        new winston.transports.Console(options.Console)
       // new winston.transports.File({filename:'logs/error.log', level:'error'}), 
       // new winston.transports.File({filename:'logs/server.log'}), 
    ], 
}); 


export default logger; 