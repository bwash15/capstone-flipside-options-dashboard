const express = require('express');
const router = express.Router();

const data = {};
data.optionLastQuote = require('../_model/optionLastQuote.json');


const getAllOptionLastQuotes = (req,res) => {
    res.json(data.optionLastQuote);
}

const createNewOptionLastQuote = (req,res) => {
    res.json({    
        "ask":          req.body.ask,
        "ask_size":     req.body.ask_size,
        "bid":          req.body.bid,
        "bid_size":     req.body.bid_size,
        "last_updated": req.body.last_updated,
        "midPoint":     req.body.midPoint, 
        "timeframe":    req.body.timeframe
    })
}

const updateOptionLastQuote = (req,res) => {
    res.json({            
        "ask":          req.body.ask,
        "ask_size":     req.body.ask_size,
        "bid":          req.body.bid,
        "bid_size":     req.body.bid_size,
        "last_updated": req.body.last_updated,
        "midPoint":     req.body.midPoint, 
        "timeframe":    req.body.timeframe
    })
}

const deleteOptionLastQuote = (req,res) => {
    res.json({"lastQuote_id": req.body.lastQuote_id});
}

const getOneOptionLastQuote = (req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"lastQuote_id": req.params.lastQuote_id});
    }

module.exports = {
    getAllOptionLastQuotes,
    createNewOptionLastQuote,
    updateOptionLastQuote,
    deleteOptionLastQuote,
    getOneOptionLastQuote
}
