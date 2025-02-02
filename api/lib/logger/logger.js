const {format , createLogger,transports, log } = require("winston");
const { LOG_LEVEL } = require("../../config");

const formats = format.combine(
    format.timestamp({format:"YYYY-MM-DD HH:mm:ss:SSS"}),
    format.simple(),
    format.splat(),
    format.printf(info => `${info.timestamp} - ${info.level.toUpperCase()}: [email:${info.message.email}], [location:${info.message.location}] , [proc_type:${info.message.proc_type}], [log:${info.message.log}]`),


)

const logger = createLogger(
   {
    level: LOG_LEVEL,
    transport:[
        new (transports.Console) ,({format:formats})
    ]
    
   }
)

module.exports=logger;