require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./_config/corsOptions')
const { logServerEvents, logger } = require('./_middleware/logServerEvents');
const errorHandler = require('./_middleware/errorHandler');
const verifyJWT = require('./_middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const credentials = require('./_middleware/credentials');
const connectDB = require('./_config/db_conn');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();

//*********************************************** */
//    Schemas
// var Greek = require('./greeksSchema');
// //var defGreeks = require('./greeksSchema');
// // var SnapShotSchema = require('./snapShotSchema');
// var OptionSnapShot = require('./oSS_schema');
//*********************************************** */
//     PORT
const PORT = process.env.PORT || 3600;
//*********************************************** */
//     CONNECT TO MONGO_DB
connectDB();
//*********************************************** */
//     Logging Middleware
//   Parameters for logging method
//   ${req.method} - Type of request (Get, POST, PUT, Delete)
//   ${req.headers.origin} - what url did the request come from
//   ${req.url} - what url was requested on our server
//
app.use(logger);
//*********************************************** */
// myEmitter.emit(`AccessNewPageLogs`, `New Page Access`,'serverActivityLogs','newPageAccessLog.txt');

myEmitter.on('serverError', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('errorLog', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('404pageFoundLogs', (msg, path, filename) => logServerEvents(msg, path, filename));

//*********************************************** */
// Handle options-credentials-check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//*********************************************** */
//     BUILT-IN MIDDLEWARE
// CORS - Cross Origin Resource Sharing
// Create directory of Allowed Origins of domains that will access the application
app.use(cors(corsOptions));

//     HANDLES FORM SUBMITTED DATA when it is submitted
// URL encoded data = Form data > Need this to grab from data when it is submitted
app.use(express.urlencoded({ extended: false }));

//     HANDLES JSON SUBMITTED DATA when it is submitted
app.use(express.json());

//     MIDDLEWARE FOR COOKIES
app.use(cookieParser());
//***********************************************  */
//      SERVE STATIC FILES - CSS APPLIED HERE
// Searches the public directory for the request before the other routes

// Applies the CSS to the application pages
// > pulls in the Public file for each route specified
app.use('/', express.static(path.join(__dirname, '/public')));

//***********************************************
//      WEB PAGE ROUTING
app.use('/', require('./_routes/root'));
app.use('/register', require('./_routes/_register'));
app.use('/auth', require('./_routes/_auth'));

app.use('/userTiles', require('./_routes/_userTiles'))

//************************************************/
//      JWT
// Everything below this line will use the JWT
// Users will have to reauthenticate the refresh token after
// specified period of time in order to continue to have 
// access after expiration
app.use('/refresh', require('./_routes/_refresh'));
app.use('/logout', require('./_routes/_logout'));
app.use(verifyJWT);
//************************************************ */
/** Web-level Middleware **/
app.use('/ProfilePage', require('./_routes/webapi/_profilePage.js'));

/************************************************* */
//      ROUTER-LEVEL MIDDLEWARE
// Routes to the subdir Route -> then to the index -> then inside subdir to the test file
// Does not needs a Static file because we will just be serving data from the database

app.use('/users', require('./_routes/api/users'));
app.use('/optionsAPIpull', require('./_routes/api/optionsAPIpull'));
app.use('/optionDays', require('./_routes/api/optionDays'));
app.use('/optionDetails', require('./_routes/api/optionDetails'));
app.use('/optionGreeks', require('./_routes/api/optionGreeks'));
app.use('/optionLastQuote', require('./_routes/api/optionLastQuote'));
app.use('/underlyingAsset', require('./_routes/api/underlyingAsset'));
//app.use('/historicalDataModels', require('./_routes/api/users'));

/**************************************************/
/**
 *    SENDING A 404 PAGE NOT FOUND
 * 
 * > Express sends a 404 by default
 * > by sending a custom page it will not send a 404 bc it will accually 
 * > send the status 404 * 
 */

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        myEmitter.emit(`404pageFoundLogs`, `404 html Page NOT Found`, 'serverActivityLogs', 'html404PageFoundLog.txt');
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        myEmitter.emit(`404pageFoundLogs`, `404 json Page NOT Found`, 'serverActivityLogs', 'json404PageFoundLog.txt');
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 txt Page NOT found');
    }
})

//****************************************************** */
//   ERROR HANDLING
app.use(errorHandler);

//****************************************************** */
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
    myEmitter.emit(`ServerActivityLogs`, `Server Port: ${PORT}`, 'ServerActivityLogs', 'expServLog.txt');
})