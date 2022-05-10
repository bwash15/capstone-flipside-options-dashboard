const express = require('express');
const router = express.Router();

const data = {
    optionDays: require('../_model/optionDays.json'),
    setOptionDays: function (data) {this.optionDays = data}    
}

const getAllOptionDays = (req,res) => {
    res.json(data.optionDays);
}

const createNewOptionDays = (req,res) => {
    const newOptionDay = {
        day_id: data.optionDays[data.optionDays.length - 1].day_id + 1 || 1,
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
    }
    if (!newOptionDay.change || !newOptionDay.change_percent || !newOptionDay.close || !newOptionDay.high || !newOptionDay.last_Updated || !newOptionDay.low || !newOptionDay.open || !newOptionDay.previous_close || !newOptionDay.volume || !newOptionDay.vwap) {
        return res.status(400).json({ 'message': ' Did not pull in all Option Days fields'});
    }
    data.setOptionDays([...data.optionDays, newOptionDay]);
    res.status(201).json(data.optionDays);
}

const updateOptionDays = (req,res) => {
    // Checks the otpionDaysID
    const optionDay = data.optionDays.find(opd => opd.day_id === parseInt(req.body.day_id));
    if(!optionDay) {
        return res.status(400).json({ "message": `optionDayID ${req.body.day_id} not found`});
    }
    if (req.body.change) optionDay.change = req.body.change;
    if (req.body.change_percent) optionDay.change_percent = req.body.change_percent;
    if (req.body.close) optionDay.close = req.body.close;
    if (req.body.high) optionDay.high = req.body.high;
    if (req.body.last_Updated) optionDay.last_Updated = req.body.last_Updated;
    if (req.body.low) optionDay.low = req.body.low;
    if (req.body.open) optionDay.open = req.body.open;
    if (req.body.previous_close) optionDay.previous_close = req.body.previous_close;
    if (req.body.volume) optionDay.volume = req.body.volume;
    if (req.body.vwap) optionDay.vwap = req.body.vwap;

    // filters the array and removes the existing user record from the array
    const filteredArray = data.optionDays.filter(opd => opd.day_id !== parseInt(req.body.day_id));
    const unsortedArray = [...filteredArray, optionDay];
    // we need the array in chronologically ordered
    // if the day_ID of a is greater than b, but we need a zero if they are EVEN as well so we add
    // the chained ternary statement
    data.setoptionDays(unsortedArray.sort((a, b) => a.day_id > b.day_id ? 1 : a.day_id < b.day_id ? -1 : 0));
    res.json(data.optionDays);  
}

const deleteOptionDays = (req,res) => {
    // Checks the otpionDaysID
    const optionDay = data.optionDays.find(opd => opd.day_id === parseInt(req.body.day_id));
    if(!optionDay) {
        return res.status(400).json({ "message": `optionDaysID ${req.body.day_id} not found`});
    }
    const filteredArray = data.optionDays.filter(opd => opd.day_id !== parseInt(req.body.day_id));
    data.setOptionDays = [...filteredArray];
    res.json(data.optionDays);
}

const getOptionDay = (req, res) => {
    // Checks the otpionDaysID
    const optionDay = data.optionDays.find(opd => opd.day_id === parseInt(req.params.day_id));
    if(!optionDay) {
        return res.status(400).json({ "message": `optionDaysID ${req.params.day_id} not found`});
    }
    res.json(optionDay);
}

module.exports = {
    getAllOptionDays,
    createNewOptionDays,
    updateOptionDays,
    deleteOptionDays,
    getOptionDay
}
