const LastQuote = require('../_model/LastQuote')
const { logServerEvents } = require('../_middleware/logServerEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on('lastQuoteControllerActivity', (msg, path, filename) => logServerEvents(msg, path, filename));


const getAllOptionLastQuotes = async (req, res) => {
    // Checking if Last Quote Data Exists
    const last_quote = await LastQuote.find();
    if (!last_quote) {
        myEmitter.emit(`lastQuoteControllerActivity`, `Last Quote Data search returned no results: ${last_quote}`, 'apiActivityLogs', 'getLastQuote/lastQuoteControllerActivity');
        return res.status(204).json({ 'Message': 'No Last Quote Data found ' })
    };
    myEmitter.emit(`lastQuoteControllerActivity`, `Last Quote Data search successful: ${JSON.stringify(last_quote)}`, 'apiActivityLogs', 'getLastQuote/lastQuoteControllerActivity');
    res.json(last_quote);
}

const createNewOptionLastQuote = async (req, res) => {
    if (!req?.body?.ask || !req?.body?.ask_size || !req?.body?.bid || !req?.body?.bid_size || !req?.body?.last_Updated || !req?.body?.midPoint || !req?.body?.timeframe) {
        return res.status(400).json({ 'Message': ' Did not pull in all Last Quote fields' });
    }
    try {
        const result = await LastQuote.create({
            ask: req.body.ask,
            ask_size: req.body.ask_size,
            bid: req.body.bid,
            bid_size: req.body.bid_size,
            last_updated: req.body.last_updated,
            midPoint: req.body.midPoint,
            timeframe: req.body.timeframe
        })
        res.status(201).json(result);
    } catch (err) {
        myEmitter.emit(`lastQuoteControllerActivity`, `New Last Quote Data Creation Failed: ${JSON.stringify(result)}`, 'apiActivityLogs', 'createNewLastQuote/lastQuoteControllerActivity');
        console.error(err);
    }

    res.status(201).json(result);
}

const updateOptionLastQuote = async (req, res) => {
    // Checks the optionLastQuoteID to see if it exists
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'No LastQuote Id Found - UpdateOptionLastQuote' });
    }

    const LastQuoteData = await LastQuote.findOne({ _id: req.body.id }).exec();
    if (!LastQuoteData) {
        return res.status(400).json({ "message": `LastQuoteID ${req.body.id} Not Found` })
    }
    if (req.body?.ask) LastQuoteData.ask = req.body.ask;
    if (req.body?.ask) LastQuoteData.ask = req.body.ask_size;
    if (req.body?.ask) LastQuoteData.ask = req.body.bid;
    if (req.body?.ask) LastQuoteData.ask = req.body.bid_size;
    if (req.body?.ask) LastQuoteData.ask = req.body.last_updated;
    if (req.body?.ask) LastQuoteData.ask = req.body.midPoint;
    if (req.body?.ask) LastQuoteData.ask = req.body.timeframe;

    const result = await LastQuoteData.save();
    res.json(data.optionLastQuote);
}

const deleteOptionLastQuote = async (req, res) => {
    // Checks the optionLastQuoteID to see if it exists
    if (!req?.body?.id) {
        return res.status(400).json({ 'Message': 'No LastQuote Id Found' });
    }
    const LastQuoteData = await LastQuote.findOne({ _id: req.body.id }).exec();
    if (!LastQuoteData) {
        return res.status(204).json({ "Message": `LastQuote Data ID ${req.body.id} not found` })
    }
    const result = await LastQuoteData.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getOneOptionLastQuote = async (req, res) => {
    // Checks the optionLastQuoteID to see if it exists
    if (!req?.params?.id) return res.status(400).json({ 'Message': 'No LastQuote Id Found in URL' })
    const LastQuoteData = await Day.findOne({ _id: req.params.id }).exec();
    if (!LastQuoteData) {
        return res.status(204).json({ "Message": `Last Quote Data ID ${req.params.id} not found` });
    }
    res.json(DayData);
}

module.exports = {
    getAllOptionLastQuotes,
    createNewOptionLastQuote,
    updateOptionLastQuote,
    deleteOptionLastQuote,
    getOneOptionLastQuote
}
