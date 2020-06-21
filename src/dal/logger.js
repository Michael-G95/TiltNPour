/*
 * Log level 2: All info events
 * Log level 1: Warnings
 * Log level 0: Errors (prod)
 */

const LOG_LEVEL = 2;

const logger = {
    logError: function(errormsg){
        if(LOG_LEVEL >=0){
            console.log(errormsg);
        }
    },

    
    logWarning: function(errormsg) {
        if(LOG_LEVEL >=1){
            console.log(errormsg);
        }
    },

    logDebug: function (errormsg) {
        if(LOG_LEVEL >=2){
            console.log(errormsg);
        }
    }
}

export default logger