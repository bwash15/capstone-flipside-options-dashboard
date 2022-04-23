const path = require('path');
const { format } = require('date-fns');
const {v4: uuid} = require('uuid');

const UserRegistrationRecord = (message, logName) => {
    // TODO:: Create log Record Object to pass in
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;  
    const logType = 'RegistrationLogs';
    const logDir = path.join(__dirname, logType); 
    const logPath = path.join(logDir, logName);         
    // Add username to the logItem
    const logItem = `\n\tDateTime:[${dateTime}]\n\tUUID:[${uuid()}]\n\tPATH:[${path.basename(logDir)}][${path.basename(logPath)}]\n\tMessage:[${message}]\n`;
    console.log(logItem);

}

module.exports = UserRegistrationRecord;