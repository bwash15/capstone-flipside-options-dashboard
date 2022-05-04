const express = require('express');
const router = express.Router();

const data = {
    optionDetails: require('../_model/optionDetails.json'),
    setOptionDetails: function (data) {this.optionDetails = data}
}

const getAllOptionDetails = (req,res) => {
    res.json(data.optionDetails);
}

const createNewOptionDetails = (req,res) => {
    const newOptionDetails = {
        details_id: data.optionDetails[data.optionDetails.length - 1].details_id + 1 || 1,
        contract_type: req.body.contract_type,
        exercise_style: req.body.exercise_style,
        expiration_date: req.body.expiration_date,
        shares_per_contract: req.body.shares_per_contract,
        strike_price: req.body.strike_price,
        ticker: req.body.ticker
    }

    if (!newOptionDetails.contract_type || !newOptionDetails.exercise_style || !newOptionDetails.expiration_date || !newOptionDetails.shares_per_contract || !newOptionDetails.strike_price || !newOptionDetails.ticker){
        return res.status(400).json({ 'message': ' Did not pull in all Options Details fields'});
    }

    data.setOptionDetails([...data.optionDetails, newOptionDetails]);
    res.status(201).json(data.optionDetails);
}

const updateOptionDetails = (req,res) => {
    // Checks the otpionDaysID
    const optionDetails = data.optionDetails.find(opd => opd.optionDetails === parseInt(req.body.optionDetails.details_id));
    if(!optionDetails) {
        return res.status(400).json({ "message": `optionDetailsID ${req.body.optionDetails.details_id} Not Found`});
    }
    if (req.body.contract_type) optionDetails.contract_type = req.body.contract_type;
    if (req.body.exercise_style) optionDetails.exercise_style = req.body.exercise_style;
    if (req.body.expiration_date) optionDetails.expiration_date = req.body.expiration_date;
    if (req.body.shares_per_contract) optionDetails.shares_per_contract = req.body.shares_per_contract;
    if (req.body.strike_price) optionDetails.strike_price = req.body.strike_price;
    if (req.body.ticker) optionDetails.ticker = req.body.ticker;

    const filteredArray = data.optionDetails.filter(opd => opd.details_id !== parseInt(req.body.details_id));
    const unsortedArray = [...filteredArray, optionDetails];
        // we need the array in chronologically ordered
    // if the details_id of a is greater than b, but we need a zero if they are EVEN as well so we add
    // the chained ternary statement
    data.setoptionDetails(unsortedArray.sort((a, b) => a.details_id > b.details_id ? 1 : a.details_id < b.details_id ? -1 : 0));
    res.json(data.optionDetails);
}

const deleteOptionDetails = (req,res) => {
        // Checks the otpionDaysID
        const optionDetails = data.optionDetails.find(opd => opd.details_id === parseInt(req.body.details_id));
        if(!optionDetails) {
            return res.status(400).json({ "message": `optionDetailsID ${req.body.details_id} Not Found`});
        }
        const filteredArray = data.optionDetails.filter(opd => opd.details_id !== parseInt(req.body.details_id));
        data.setOptionDetails = [...filteredArray];
        res.json(data.optionDetails);
}


const getOptionDetails = (req, res) => {
        // Checks the otpionDaysID
        const optionDetails = data.optionDetails.find(opd => opd.details_id === parseInt(req.body.details_id));
        if(!optionDetails) {
            return res.status(400).json({ "message": `optionDetailsID ${req.body.details_id} Not Found`});
        }
        res.json(optionDetails);
}


module.exports = {
    getAllOptionDetails,
    createNewOptionDetails,
    updateOptionDetails,
    deleteOptionDetails,
    getOptionDetails
}

