const express = require('express');
const app = express();

const path = require('path');
const logServerEvents = require('./logServerEvents');
const EventEmitter = require('events');
const { application } = require('express');
const { nextTick } = require('process');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();
myEmitter.on('ServerActivityLogs', (msg, path, filename) => logServerEvents(msg, path, filename));
const PORT = process.env.PORT || 3600;

// ** Reads this page like a waterfall **
// what do we want to do with the page 
// '/' is the root 
// res.send('Hello World!');
// res.sendFile('./views/index.html', {root: __dirname});
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

/**
 * (.html)? - allows someone to find webpage without .html extension on the
 * end of the URL 
 * 
 */
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

/**
 *      Redirect from old-page to new-page
 * 
 * > 302 by default, we want a 301 so the browser will 
 * > see the page has been permanently removed
 */
app.get('/old-page(.html)?', (req, res) => {
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







