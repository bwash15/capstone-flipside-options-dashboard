// creates a TAB delimited log file 
/**
 * 
 * @param {is the error message for the event} message 
 * @param {type of the log; Also, path to the log file} logType 
 * @param {log file name} logName 
 *  > async / await
 *  > logs the date time of the event in a TAB delimited log file 
 *  > logs the event message after the dateTime also TAB delimited
 * *****************************
 *  ## Creates the LogItem to be recorded 
 *  > const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    > const logItem = `${dateTime}\t${uuid()}\t${message}`;
    * 
    * *****************************
    *  > await fsPromises.appendFile(path.join(__dirname, 'logs'))
 *      > appendFile will create a new directory if one does not
 *          exist
 * 
 * ******** Will check to see if the directory exists and if not
 *          will create one before trying to create the log file
 * 
 *      > > if(!fs.existsSync(path.join(__dirname, 'logs'))) {
    await fsPromises.mkdir(path.join(__dirname, 'logs'));
            } 
            * 
            * *****************************
            *  Snippets
            * ----------
 * console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
 * console.log(uuid());
 * 
            */
            // const ServerLogRecord = require('./logRecordItems/ServerLogRecord');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const {v4: uuid} = require('uuid');



const logServerEvents = async (message, logType, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;  
    const logDir = path.join(__dirname, logType); 
    const logPath = path.join(logDir, logName);         
    // Add username to the logItem
    const logItem = `\nDateTime:[${dateTime}]\tUUID:[${uuid()}]\tPATH:[${path.basename(logDir)}][${path.basename(logPath)}]\n\tMessage:[${message}]\n`;
    console.log(logItem);
    try{  
        // check to see if the directory exists
        if(!fs.existsSync(path.join(__dirname, logType))) {
            // if not will create one before trying to create the log file
            await fsPromises.mkdir(path.join(__dirname, logType));
        } 
        
        await fsPromises.appendFile(logPath, logItem);
    }catch (err){
        console.log(err);
    }
}

module.exports = logServerEvents;





