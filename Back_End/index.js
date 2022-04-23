const userRegistrationEvent = require('./EventLoggers/userRegistrationEvent');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();
const PORT = process.env.PORT || 3500;      

myEmitter.on('RegisterLog', (msg) => userRegistrationEvent(msg, 'RegistrationLogs' , 'userRegistrationLogs.txt'));

setTimeout(() => {
    // Emit Events
    myEmitter.emit(`RegisterLog`, `Server started on ${PORT}!`);
}, 2000 )






