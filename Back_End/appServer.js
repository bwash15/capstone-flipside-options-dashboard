const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logServerEvents = require('./logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter{ };
const myEmitter = new Emitter();
//******************************
// listeners for the EventLogger
myEmitter.on('serverActivityLogs', (msg) => logServerEvents(msg, 'serverActivityLogs' , 'serverActivityLogs.txt'));
myEmitter.on('serverErrorLogs', (msg) => logServerEvents(msg, 'serverErrorLogs' , 'serverErrorLogs.txt'));
//******************************
// Replace [process.env.PORT] with where we
// would be Hosting the site at
const PORT = process.env.PORT || 3500;

// param1 - filePath is the file you are wanting to serve
// param2 - contentType is the file type and extension
// param3 - the response object passed in 
const serveFile = async (filePath, contentType, response) => {
    try {
        // Get the data from the file
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : '');
        // if the contentType is equal to JSON - parse the JSON data
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType });
        // returns JSON in the correct format
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );

    } catch (err) {
        console.log(err);
        // Error Event Handler goes here 
        myEmitter.emit('serverErrorLogs', `${err.name}: ${err.message}`, 'errorLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

// defining the server 
const server = http.createServer((req, res) => {
        console.log(req.url, req.method);
        // ServerEvent Handler goes here
        myEmitter.emit('serverActivityLogs', `${req.url}\t${req.method}`, 'reqlog.txt');

        // sets the extension
        const extension = path.extname(req.url);
        let contentType;
        // looks at the extension type of the files we are trying to serve
        switch (extension) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.jpg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.txt':
                contentType = 'text/plain';
                break;
            default:
                // Handles urls ending with a slash - not have an extension at all
                // or .html
                contentType = 'text/html';
        }

        let filePath; 
      
        if (contentType === 'text/html' && req.url === '/')
            filePath = path.join(__dirname,'views', 'index.html');
                // accounts for the subdirectory in the views folder
        else if (contentType === 'text/html' && req.url.slice(-1) === '/')
            filePath = path.join(__dirname,'views', req.url, 'index.html');
        else if (contentType === 'text/html')
            filePath = path.join(__dirname,'views', req.url);
        else {
            // it could be css or one of the other folders that is specified in the 
            // request URL
            filePath = path.join(__dirname, req.url);
        }
        // this statement allows us NOT to enter .html in the browser to find the page
        if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

        // Returns true or false
        const fileExists = fs.existsSync(filePath);

        if (fileExists) {
            // serve the file contained in the filePath variable, contentType defined 
            // above and the response object
            serveFile(filePath, contentType, res);
        } else {
            // possible 404
            // possible 301 redirect 
            // switched on the base file path of the parsed filePath
            switch (path.parse(filePath).base) {
                case 'old-page.html':
                    // 301 - Redirect 
                    res.writeHead(301, { 'Location': '/new-page.html' });
                    res.end();
                    break;

                case 'www-page.html':
                    // 301 - Redirect to the root
                    res.writeHead(301, { 'Location': '/' });
                    res.end();
                    break;

                default:
                    // default should be the 404 - serve 404 response
                    //_404_Path = path.join(__dirname, 'veiws', '404.html');
                    serveFile(path.join(__dirname, 'views', '404.html'), contentType, res);
            }

            console.log(path.parse(filePath));
    }
})
server.listen(PORT, () => console.log(`Server Running on ${PORT}`));


// myEmitter.on('ServerLog', (msg) => logServerEvents(msg, 'serverLogs' , 'logs.txt'));

// setTimeout(() => {
//     // Emit Events
//     myEmitter.emit('ServerLog', 'Server log event emitted!');
// }, 2000 )






