const {logServerEvents} = require('./logServerEvents');

const errorHandler = (err, req, res, next) => {
    logServerEvents(`${err.message} : ${err.stack}`, 'serverErrorLogs', 'errLog.txt');
    console.trace(`${req.path}`)
    console.error(`${err.stack}\t`);
    console.error(`${req.originalUrl}`);  
    console.error(`${req.baseUrl}`);  
    res.status(500).send(`${err.message}`);
}

module.exports = errorHandler;