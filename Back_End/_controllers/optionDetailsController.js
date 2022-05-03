const express = require('express');
const router = express.Router();

const data = {};
data.optionDetails = require('../_model/optionDetails.json');


const getAllOptionDetails = (req,res) => {
    res.json(data.optionDetails);
}


const createNewOptionDetails = (req,res) => {
    res.json({             
        "contract_type":          req.body.contract_type,
        "exercise_style":         req.body.exercise_style, 
        "expiration_date":        req.body.expiration_date, 
        "shares_per_contract":    req.body.shares_per_contract,
        "strike_price":           req.body.strike_price, 
        "ticker":                 req.body.ticker 
    })
}

const updateOptionDetails = (req,res) => {
    res.json({            
        "contract_type":          req.body.contract_type,
        "exercise_style":         req.body.exercise_style, 
        "expiration_date":        req.body.expiration_date, 
        "shares_per_contract":    req.body.shares_per_contract,
        "strike_price":           req.body.strike_price, 
        "ticker":                 req.body.ticker 
    })
}

const deleteOptionDetails = (req,res) => {
    res.json({"details_id": req.body.details_id});
}


const getOptionDetails = (req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"details_id": req.params.details_id});
    }


module.exports = {
    getAllOptionDetails,
    createNewOptionDetails,
    updateOptionDetails,
    deleteOptionDetails,
    getOptionDetails
}

