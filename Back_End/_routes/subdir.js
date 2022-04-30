const express = require('express');
const router = express.Router();
const path = require('path');



router.get('^/$|/index(.html)?', (req, res) => {
    try {        
        res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
    }catch(err){
        console.log(err);
        myEmitter.emit('errorLog', 'message: ' + err.message, 'serverErrorLogs', 'indexPageAccessErrors.txt' );
    }
})


router.get('/test(.html)?', (req, res) => {
    try {        
        res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
    }catch(err){
        console.log(err);
        myEmitter.emit('errorLog', 'message: ' + err.message, 'serverErrorLogs', 'indexPageAccessErrors.txt' );
    }
})

module.exports = router;
