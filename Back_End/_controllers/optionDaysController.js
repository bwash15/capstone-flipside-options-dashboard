const express = require('express');
const router = express.Router();

const data = {};
data.optionDay = require('../_model/optionDays.json');


const getAllOptionDays = (req,res) => {
    res.json(data.optionDay);
}

const createNewOptionDays = (req,res) => {
    res.json({            
        "change":         req.body.change,
        "change_percent": req.body.change_percent,
        "close":          req.body.close,
        "high":           req.body.high,
        "last_Updated":   req.body.last_Updated, 
        "low":            req.body.low,
        "open":           req.body.open,
        "previous_close": req.body.previous_close, 
        "volume":         req.body.volume, 
        "vwap":           req.body.vwap 
    })
}


const updateOptionDays = (req,res) => {
    res.json({            
        "change":         req.body.change,
        "change_percent": req.body.change_percent,
        "close":          req.body.close,
        "high":           req.body.high,
        "last_Updated":   req.body.last_Updated, 
        "low":            req.body.low,
        "open":           req.body.open,
        "previous_close": req.body.previous_close, 
        "volume":         req.body.volume, 
        "vwap":           req.body.vwap 
    })
}



const deleteOptionDays = (req,res) => {
    res.json({"day_id": req.body.day_id});
}


const getOptionDays = (req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"day_id": req.params.day_id});
}


module.exports = {
    getAllOptionDays,
    createNewOptionDays,
    updateOptionDays,
    deleteOptionDays,
    getOptionDays
}
