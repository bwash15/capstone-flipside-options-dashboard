const express = require('express');
const router = express.Router();

const data = {};
data.greeks = require('../_model/optionGreeks.json');



const getAllOptionGreeks = (req,res) => {
    res.json(data.greeks);
}


const createNewOptionGreeks = (req,res) => {
    res.json({             
        "delta": req.body.delta,
        "gamma": req.body.gamma,
        "theta": req.body.theta,
        "vega":  req.body.vega  
    })
}


const updateOptionGreeks = (req,res) => {
    res.json({            
        "delta": req.body.delta,
        "gamma": req.body.gamma,
        "theta": req.body.theta,
        "vega":  req.body.vega  
    })
}

const deleteOptionGreeks = (req,res) => {
    res.json({"greeks_id": req.body.greeks_id});
}

const getOptionGreek = (req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"greeks_id": req.params.greeks_id});
    }

module.exports = {
    getAllOptionGreeks,
    createNewOptionGreeks,
    updateOptionGreeks,
    deleteOptionGreeks,
    getOptionGreek
}
