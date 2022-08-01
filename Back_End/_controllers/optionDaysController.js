const Day = require('../_model/Day');
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('dayControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));


const getAllOptionDays = async (req, res) => {
    // Checking if Day Data Exists
    const days = await Day.find();
    if (!days) {
        myEmitter.emit(`dayControllerActivity`, `Day Data search returned no results: ${days}`, 'apiActivityLogs', 'getDay/dayController');
        return res.status(204).json({ 'Message': 'No Day Data found ' })
    };
    myEmitter.emit(`dayControllerActivity`, `Day Data search successful: ${JSON.stringify(days)}`, 'apiActivityLogs', 'getDay/dayController');
    res.json(days);
}

const createNewOptionDays = async (req, res) => {
    if (!req?.body?.change || !req?.body?.change_percent || !req?.body?.close || !req?.body?.high || !req?.body?.last_Updated || !req?.body?.low || !req?.body?.open || !req?.body?.previous_close || !req?.body?.volume || !req?.body?.vwap) {
        return res.status(400).json({ 'Message': ' Did not pull in all Day Data fields' });
    }
    try {
        const result = await Day.create({
            change: req.body.change,
            change_percent: req.body.change_percent,
            close: req.body.close,
            high: req.body.high,
            last_Updated: req.body.last_Updated,
            low: req.body.low,
            open: req.body.open,
            previous_close: req.body.previous_close,
            volume: req.body.volume,
            vwap: req.body.vwap
        });
        // Sending a status 201 for success
        res.status(201).json(result);
    } catch (err) {
        myEmitter.emit(`dayControllerActivity`, ` New Day Data Creation Failed: ${JSON.stringify(result)}`, 'apiActivityLogs', 'createNewDay/dayController');
        console.error(err);
    }
}

const updateOptionDays = async (req, res) => {
    // Checks if there exists an otpionDaysID
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Day Id parameter required, No Day Id Found - UpdateOptionDays' });
    }
    // Compares the Mongo auto generated _id to the ID that was passed in 
    const DayData = await Day.findOne({ _id: req.body.id }).exec();
    if (!DayData) {
        // request may have been made properly -> it just doesn't exist
        return res.status(204).json({ "Message": `Day Data ID ${req.body.id} not found - UpdateOptionDays` });
    }
    if (req.body?.change) DayData.change = req.body.change;
    if (req.body?.change_percent) DayData.change_percent = req.body.change_percent;
    if (req.body?.close) DayData.close = req.body.close;
    if (req.body?.high) DayData.high = req.body.high;
    if (req.body?.last_Updated) DayData.last_Updated = req.body.last_Updated;
    if (req.body?.low) DayData.low = req.body.low;
    if (req.body?.open) DayData.open = req.body.open;
    if (req.body?.previous_close) DayData.previous_close = req.body.previous_close;
    if (req.body?.volume) DayData.volume = req.body.volume;
    if (req.body?.vwap) DayData.vwap = req.body.vwap;

    // Save to DB
    const result = await DayData.save();
    // Send data in response
    res.status(201).json(result);
}

const deleteOptionDays = async (req, res) => {
    // Checks the otpionDaysID
    // Checks if there exists an otpionDaysID
    if (!req?.body?.id) {
        return res.status(400).json({ 'Message': 'No Day Id Found' });
    }
    const DayData = await Day.findOne({ _id: req.body.id }).exec();
    if (!DayData) {
        return res.status(204).json({ "Message": `Day Data ID ${req.body.id} not found` })
    }
    const result = await DayData.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getOptionDay = async (req, res) => {
    // Checks the otpionDaysID
    if (!req?.params?.id) return res.status(400).json({ 'Message': 'No Day Id Found in URL' })
    const DayData = await Day.findOne({ _id: req.params.id }).exec();
    if (!DayData) {
        return res.status(204).json({ "Message": `Day Data ID ${req.params.id} not found` });
    }
    res.json(DayData);
}

module.exports = {
    getAllOptionDays,
    createNewOptionDays,
    updateOptionDays,
    deleteOptionDays,
    getOptionDay
}
