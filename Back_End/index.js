const logServerEvents = require('./logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();
const PORT = process.env.PORT || 3500;      

myEmitter.on('ServerLog', (msg) => logServerEvents(msg, 'serverLogs' , 'activityLogs.txt'));

setTimeout(() => {
    // Emit Events
    myEmitter.emit(`ServerLog`, `Server started on ${PORT}!`);
}, 2000 )






