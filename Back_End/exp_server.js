const express = require('express');
const app = express();
const PORT = process.env.PORT || 3600;
const path = require('path');

const logServerEvents = require('./logServerEvents');
const EventEmitter = require('events');
const { application } = require('express');
const { nextTick } = require('process');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();


app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
myEmitter.emit(`ServerActivityLogs`, `Server Port: ${PORT}`,'ServerActivityLogs','expServLog.txt');







