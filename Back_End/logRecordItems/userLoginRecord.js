const path = require('path');
const { format } = require('date-fns');
const {v4: uuid} = require('uuid');


import React from 'react'

const UserLoginRecord = (message, logType, logName) => {
    // TODO:: Create Options log Record Object to pass in
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;  
    const logDir = path.join(__dirname, logType); 
    const logPath = path.join(logDir, logName);         
    // Add username to the logItem
    const logItem = `\n\tDateTime:[${dateTime}]\n\tUUID:[${uuid()}]\n\tPATH:[${path.basename(logDir)}][${path.basename(logPath)}]\n\tMessage:[${message}]\n`;
    console.log(logItem);
  return (
    <div>{logItem}</div>
  )
}

export default UserLoginRecord

