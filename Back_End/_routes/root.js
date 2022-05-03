const express = require('express');
const router = express.Router();
const path = require('path');

//************************************************ */
const {logServerEvents, logger} = require('../_middleware/logServerEvents');
const errorHandler = require('../_middleware/errorHandler');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();

myEmitter.on('AccessRootPageLogs', (msg, path, filename) => logServerEvents(msg, path, filename));

/************************************************* */
/**     -  GET, POST, PUT, DELETE  -
 **   Reads this page like a waterfall **
 *    What do we want to do with the page 
 *  >  '/' is the root 
 *  > (.html)? - allows someone to find webpage without 
 *               .html extension on the end of the URL 
 * 
 */
 router.get('^/$|/index(.html)?', (req, res) => {
    try {        
        res.sendFile(path.join(__dirname,'..', 'views', 'index.html'));
        myEmitter.emit(`AccessRootPageLogs`, `New Page Access`,'serverRequestLogs','rootAccessLog.txt');
    }catch(err){
        console.log(err);
        errorHandler();
        // myEmitter.emit('errorLog', 'message: ' + err.message, 'serverErrorLogs', 'rootAccessLog.txt' );
    }
})

module.exports = router;