const express = require('express');
const router = express.Router();

const data = {};
data.underlyingAsset = require('../_model/underlyingAsset.json');


const getAllUnderlyingAssets = (req,res) => {
    res.json(data.underlyingAsset);
}


const createNewUnderlyingAsset = (req,res) => {
    res.json({             
        "change_to_break_even":   req.body.change_to_break_even,
        "last_updated":           req.body.last_updated,
        "price":                  req.body.price,
        "ticker":                 req.body.ticker,
        "timeframe":              req.body.timeframe  
    })
}


const updateUnderlyingAsset = (req,res) => {
    res.json({            
        "change_to_break_even":   req.body.change_to_break_even,
        "last_updated":           req.body.last_updated,
        "price":                  req.body.price,
        "ticker":                 req.body.ticker,
        "timeframe":              req.body.timeframe  
    })
}

const deleteUnderlyingAsset = (req,res) => {
    res.json({"underlyingAssetid": req.body.underlyingAssetid});
}

const getUnderlyingAsset =(req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"underlyingAssetid": req.params.underlyingAssetid});
    }


module.exports = {
    getAllUnderlyingAssets,
    createNewUnderlyingAsset,
    updateUnderlyingAsset,
    deleteUnderlyingAsset,
    getUnderlyingAsset
}

