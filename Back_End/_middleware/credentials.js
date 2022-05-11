/**
 *  If the url request is in our 'allowedOrigins' list
 *  set the header on the response so that cors will not 
 *  catch our request from the front-end
 *
 *  Called before cors in the server.js
 * 
 */
const allowedOrigins = require('../_config/allowedOrigins');


const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials

