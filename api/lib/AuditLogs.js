const _enum = require("../config/enum");
const AuditLogsModel = require("../db/models/AuditLogs")

let instance = null;
class AuditLogs{
    constructor() {
        if(!instance){
            instance = this;
        }

        return instance;
    }

    info(email,location,proc_type,log){
        this.#saveToDB({
            level: _enum.LOG_LEVELS.INFO,

            email,location,proc_type,log
        })
    }

    warn(email,location,proc_type,log){
        this.#saveToDB({
            level: _enum.LOG_LEVELS.WARN,
            
            email,location,proc_type,log
        })
    }

    error(email,location,proc_type,log){
        this.#saveToDB({
            level: _enum.LOG_LEVELS.ERROR,
            
            email,location,proc_type,log
        })
    }

    debug(email,location,proc_type,log){
        this.#saveToDB({
            level: _enum.LOG_LEVELS.DEBUG,
            
            email,location,proc_type,log
        })
    }

    verbose(email,location,proc_type,log){
        this.#saveToDB({
            level: _enum.LOG_LEVELS.VERBOSE,
            
            email,location,proc_type,log
        })
    }

    HTTP(email,location,proc_type,log){
        this.#saveToDB({
            level: _enum.LOG_LEVELS.HTTP,
            
            email,location,proc_type,log
        })
    }

    #saveToDB({level,email,location,proc_type,log}){
       AuditLogsModel.create({
            level,
            email,
            location,
            proc_type,
            log
       })
        
    }
}

module.exports = new AuditLogs;
