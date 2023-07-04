import { createLogger, transports, format } from "winston";

class LoggerProvider {

    private static instance: LoggerProvider;
    private logger;

    private constructor(){
        this.logger = createLogger({
            transports: [
                new transports.File({
                    filename: "logs/server.log",
                    level: "info",
                    format: format.combine(
                        format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
                        format.align(),
                        format.printf(
                            info => `${info.level}: ${[info.timestamp]}: ${info.message}`
                        )
                    )
                })
            ]
        });
    }

    public static getInstance(){
        if (!LoggerProvider.instance){
            LoggerProvider.instance = new LoggerProvider();
        }
        return LoggerProvider.instance;
    }

    info(msg: string){
        this.logger.info(msg);
    }
    
    error(msg: string){
        this.logger.error(msg);
    }

    debug(msg: string){
        this.logger.debug(msg);
    }

    warn(msg: string){
        this.logger.warn(msg);
    }   
}

export default LoggerProvider;