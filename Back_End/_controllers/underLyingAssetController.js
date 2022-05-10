const express = require('express');
const router = express.Router();

const data = {
    optionUnderlyingAsset: require('../_model/underlyingAsset.json'),
    setUnderlyingAsset: function (data) {this.optionUnderlyingAsset = data}
};

const getAllUnderlyingAssets = (req,res) => {
    res.json(data.underlyingAsset);
}

const createNewUnderlyingAsset = (req,res) => {
    const newUnderlyingAsset = {
        underlyingAssetid: req.body.underlyingAssetid,
        change_to_break_even: req.body.change_to_break_even,
        last_updated: req.body.last_updated,
        price: req.body.price, 
        ticker: req.body.ticker,
        timeframe: req.body.timeframe
    }
    if (!newUnderlyingAsset.change_to_break_even || !newUnderlyingAsset.last_updated || !newUnderlyingAsset.price || !newUnderlyingAsset.ticker || !newUnderlyingAsset.timeframe) {
        return res.status(400).json({ 'message': ' Did not pull in all Underlying Asset fields'});
    }
    data.setUnderlyingAsset([...data.optionUnderlyingAsset, newUnderlyingAsset]);
    res.status(201).json(data.optionUnderlyingAsset);
}

const updateUnderlyingAsset = (req,res) => {
    const underlyingAsset = data.optionUnderlyingAsset.find(opua => opua.underlyingAssetid === parseInt(req.body.underlyingAssetid));
    if (!optionUnderlyingAsset) {
        return res.status(400).json({ "message" : `Underlying Asset ${req.body.underlyingAssetid} not found`});
    }
    if(req.body.change_to_break_even) underlyingAsset.change_to_break_even = req.body.change_to_break_even;
    if(req.body.last_updated) underlyingAsset.last_updated = req.body.last_updated;
    if(req.body.price) underlyingAsset.price = req.body.price;
    if(req.body.ticker) underlyingAsset.ticker = req.body.ticker;
    if(req.body.timeframe) underlyingAsset.timeframe = req.body.timeframe;

    const filteredArray = data.optionUnderlyingAsset.filter(opua => opua.underlyingAssetid !== parseInt(req.body.underlyingAssetid));
    const unsortedArray = [...filteredArray, underlyingAsset];
    data.setUnderlyingAsset(unsortedArray.sort((a, b) => a.underlyingAssetid > b.underlyingAssetid ? 1 : a.underlyingAssetid < b.underlyingAssetid ? -1 : 0));
    res.json(data.optionUnderlyingAsset);
}

const deleteUnderlyingAsset = (req,res) => {
    const underlyingAsset = data.optionUnderlyingAsset.find(opua => opua.underlyingAssetid === parseInt(req.body.underlyingAssetid));
    if (!underlyingAsset) {
        return res.status(400).json({ "message" : `Underlying Asset ${req.body.underlyingAssetid} not found`});
    }
    const filteredArray = data.optionUnderlyingAsset.filter(opua => opua.underlyingAssetid !== parseInt(req.body.underlyingAssetid));
    data.setUnderlyingAsset = [...filteredArray];
    // responds with the new collection
    res.json(data.optionUnderlyingAsset);
}

const getUnderlyingAsset =(req, res) => {
    // Checks the otpionDaysID
    const optionDay = data.optionDays.find(opd => opd.day_id === parseInt(req.params.day_id));
    if(!optionDay) {
        return res.status(400).json({ "message": `optionDaysID ${req.params.day_id} Not Found`});
    }
    // using params here because it is 
    // going to pull it directly from the URL
        res.json(optionDay);
    }


module.exports = {
    getAllUnderlyingAssets,
    createNewUnderlyingAsset,
    updateUnderlyingAsset,
    deleteUnderlyingAsset,
    getUnderlyingAsset
}

