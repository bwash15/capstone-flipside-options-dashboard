const express = require('express');
const router = express.Router();
const {logServerEvents} = require('../_middleware/logServerEvents');
const errorHandler = require('../_middleware/errorHandler');
const EventEmitter = require('events');
class Emitter extends EventEmitter{};
const myEmitter = new Emitter();
myEmitter.on('userLoginActivity', (msg, path, filename) => logServerEvents(msg, path, filename));

const data = {
    optionLastQuote: require('../_model/optionLastQuote.json'),
    setOptionLastQuote: function (data) {this.optionLastQuote = data}
}

const getAllOptionLastQuotes = (req,res) => {
    res.json(data.optionLastQuote);
}

const createNewOptionLastQuote = (req,res) => {
    const newOptionLastQuote = {
        lastQuote_id: data.optionLastQuote[data.optionLastQuote.length - 1].lastQuote_id + 1 || 1,
        ask: req.body.ask,
        ask_size: req.body.ask_size,
        bid: req.body.bid,
        bid_size: req.body.bid_size,
        last_updated: req.body.last_updated,
        midPoint: req.body.midPoint,
        timeframe: req.body.timeframe
    }
        if (!newOptionLastQuote.ask || !newOptionLastQuote.ask_size || !newOptionLastQuote.bid || !newOptionLastQuote.bid_size || !newOptionLastQuote.last_updated || !newOptionLastQuote.midPoint || !newOptionLastQuote.timeframe ){
            return res.status(400).json({ 'message': ' Did not pull in all Option Last Quote fields'});
    }
    data.setOptionLastQuote([...data.optionLastQuote, newOptionLastQuote]);
    res.status(201).json(data.optionLastQuote); 
}

const updateOptionLastQuote = (req,res) => {
    // Checks the optionLastQuoteID to see if it exists
    const optionLastQuote = data.optionLastQuote.find(oplq => oplq.lastQuote_id === parseInt(req.body.lastQuote_id));
    if(!optionLastQuote) {
        return res.status(400).json({ "message": `optionLastQuoteID ${req.body.lastQuote_id} Not Found`})
    }
    if(req.body.ask) optionLastQuote.ask = req.body.ask;
    if(req.body.ask) optionLastQuote.ask = req.body.ask_size;
    if(req.body.ask) optionLastQuote.ask = req.body.bid;
    if(req.body.ask) optionLastQuote.ask = req.body.bid_size;
    if(req.body.ask) optionLastQuote.ask = req.body.last_updated;
    if(req.body.ask) optionLastQuote.ask = req.body.midPoint;
    if(req.body.ask) optionLastQuote.ask = req.body.timeframe;

    const filteredArray = data.optionLastQuote.filter(oplq => oplq.lastQuote_id !== parseInt(req.body.lastQuote_id));
    const unsortedArray = [...filteredArray, optionLastQuote];
    data.setOptionLastQuote(unsortedArray.sort((a, b) => a.lastQuote_id > b.lastQuote_id ? 1 : a.lastQuote_id < b.lastQuote_id ? -1 : 0));
    res.json(data.optionLastQuote);
}

const deleteOptionLastQuote = (req,res) => {
    // Checks the optionLastQuoteID to see if it exists
    const optionLastQuote = data.optionLastQuote.find(oplq => oplq.lastQuote_id === parseInt(req.body.lastQuote_id));
    if(!optionLastQuote) {
        return res.status(400).json({ "message": `optionLastQuoteID ${req.body.lastQuote_id} Not Found`})
    }
    const filteredArray = data.optionLastQuote.filter(oplq => oplq.lastQuote_id !== parseInt(req.body.lastQuote_id));
    data.setOptionLastQuote = [...filteredArray];
    res.json(data.optionLastQuote);
}

const getOneOptionLastQuote = (req, res) => {
    // Checks the optionLastQuoteID to see if it exists
    const optionLastQuote = data.optionLastQuote.find(oplq => oplq.lastQuote_id === parseInt(req.params.lastQuote_id));
    if(!optionLastQuote) {
        return res.status(400).json({ "message": `optionLastQuoteID ${req.params.lastQuote_id} Not Found`})
    }
    res.json(optionLastQuote);
}

module.exports = {
    getAllOptionLastQuotes,
    createNewOptionLastQuote,
    updateOptionLastQuote,
    deleteOptionLastQuote,
    getOneOptionLastQuote
}
