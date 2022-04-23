// creates a TAB delimited log file 
/**
 * 
 * @param {is the error message for the event} message 
 *  > async / await
 *  > logs the date time of the event in a TAB delimited log file 
 *  > logs the event message after the dateTime also TAB delimited
 * *****************************
 *  ## Creates the LogItem to be recorded 
 *  > const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    > const logItem = `${dateTime}\t${uuid()}\t${message}`;
    > logType = directory name for the log file
    > logItem = a log record event. Defined in the logRecordItems
        directory
    * 
    * *****************************
    *  > await fsPromises.appendFile(path.join(__dirname, logType))
 *      > appendFile will create a new directory if one does not
 *          exist
 * 
 * ******** Will check to see if the directory exists and if not
 *          will create one before trying to create the log file
 * 
 *      > > if(!fs.existsSync(path.join(__dirname, logType))) {
    await fsPromises.mkdir(path.join(__dirname, logType));
            } 
            * 
            * *****************************
            *  Snippets
            * ----------
 * console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
 * console.log(uuid());
 * 
            */

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


const { format } = require('date-fns');
const {v4: uuid} = require('uuid');

const userRegistrationEvent = async (message, logType, logName) => {
    
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;  
    const logDir = path.join(__dirname,'..', logType); 
    const logPath = path.join(logDir, logName);         
    // Add username to the logItem
    const logItem = `\n\tDateTime:[${dateTime}]\n\tUUID:[${uuid()}]\n\tPATH:[${path.basename(logDir)}][${path.basename(logPath)}]\n\tMessage:[${message}]\n`;
    console.log(logItem);
    try{  
        // check to see if the directory exists
        if(!fs.existsSync(path.join(logDir))) {
            // if not will create one before trying to create the log file
            await fsPromises.mkdir(logDir);
        }         
        await fsPromises.appendFile(path.join(logDir, logName), logItem);
    }catch (err){
        console.log(err);
    }
}

module.exports = userRegistrationEvent;
            