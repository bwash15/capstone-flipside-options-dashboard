const express = require('express');
const app = express();
const path = require('path');

const logServerEvents = require('./logServerEvents');
const EventEmitter = require('events');
const { application } = require('express');
const { nextTick } = require('process');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3600;

myEmitter.on('ServerActivityLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('ServerFormDataLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('ServerJSONDataLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('ServerPublicDataLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('AccessIndexPageLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('AccessNewPageLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('AccessHomePageLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
myEmitter.on('404pageFoundLogs', (msg, path, filename) => logServerEvents(msg, path, filename));

//*********************************************** */
// Built-in Middleware

// Handles Form data when it is submitted
app.use(express.urlencoded({extended: false}));
myEmitter.emit(`ServerFormDataLogs`, `Server found form data`,'ServerActivityLogs','formDataLog.txt');

// Handles JSON data when it is submitted
app.use(express.json());
myEmitter.emit(`ServerJSONDataLogs`, `Server found JSON data`,'ServerActivityLogs','jsonDataLog.txt');

// serve static files - searches the public directory for 
// the request before the other routes
// Applies the CSS to the application pages
app.use(express.static(path.join(__dirname, '/public')));
myEmitter.emit(`ServerPublicDataLogs`, `Server found request in Public directory`,'ServerActivityLogs','publicDataLog.txt');

/************************************************* */

// ** Reads this page like a waterfall **
// what do we want to do with the page 
// '/' is the root 
// res.send('Hello World!');
// res.sendFile('./views/index.html', {root: __dirname});
app.get('^/$|/index(.html)?', (req, res) => {
    myEmitter.emit(`AccessIndexPageLogs`, `Index Page Access`,'ServerActivityLogs','indexPageAccessLog.txt');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

/**
 * (.html)? - allows someone to find webpage without .html extension on the
 * end of the URL 
 * 
 */
app.get('/new-page(.html)?', (req, res) => {
    myEmitter.emit(`AccessNewPageLogs`, `New Page Access`,'ServerActivityLogs','newPageAccessLog.txt');
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

/**
 *      Redirect from old-page to new-page
 * 
 * > 302 by default, we want a 301 so the browser will 
 * > see the page has been permanently removed
 */
app.get('/old-page(.html)?', (req, res) => {
    myEmitter.emit(`ServerActivityLogs`, `Old Page Access`,'ServerActivityLogs','oldPageAccessLog.txt');
    res.redirect(301, '/new-page.html'); 
})
/**
 *    Sending a custom 404 page
 * > Express sends a 404 by default
 * > by sending a custom page it will not send a 404 bc it will accually 
 * > send the status 404
 * 
 */

app.get('/*', (req, res)=> {
    myEmitter.emit(`404pageFoundLogs`, `404 Page Found`,'ServerActivityLogs','404PageFoundLog.txt');
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

// Route Handlers
app.get('/hell(.html)?', (req, res) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
myEmitter.emit(`ServerActivityLogs`, `Server Port: ${PORT}`,'ServerActivityLogs','expServLog.txt');







