const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const {v4: uuid} = require('uuid');

const optionUpdateEvent = async (message, logType, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    // Add username to the logItem
    const logItem = `[${dateTime}]\t[${uuid()}]\n\t[${message}]\n\t[${logType}]`;
    console.log(logItem);
    try{  
        // check to see if the directory exists
        if(!fs.existsSync(path.join(__dirname, logType))) {
            // if not will create one before trying to create the log file
            await fsPromises.mkdir(path.join(__dirname, logType));
        } 
        
        await fsPromises.appendFile(path.join(__dirname, logType, logName), logItem);
    }catch (err){
        console.log(err);
    }
}

module.exports = optionUpdateEvent;