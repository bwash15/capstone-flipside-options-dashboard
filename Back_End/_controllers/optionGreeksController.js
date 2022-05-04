const { nextWednesday } = require('date-fns');
const express = require('express');
const router = express.Router();

const data = {
    greeks: require('../_model/optionGreeks.json'),
    setOptionGreeks: function (data) {this.greeks = data}
}

const getAllOptionGreeks = (req,res) => {
    res.json(data.greeks);
}

const createNewOptionGreeks = (req,res) => {
    const newOptionGreeks = {
        greeks_id: data.greeks[data.greeks.length - 1].greeks_id + 1 || 1, 
        delta: req.body.delta,
        gamma: req.bdoy.gamma,
        theta: req.body.theta, 
        vega: req.body.vega
    }
    if(!newOptionGreeks.delta || !newOptionGreeks.gamma || !newOptionGreeks.theta || !newOptionGreeks.vega) {
        return res.status(400).json({ 'message': ' Did not pull in all Option Greeks fields'});
    }
    data.setOptionGreeks([...data.greeks, newOptionGreeks]);
    res.status(201).json(data.greeks)
}

const updateOptionGreeks = (req,res) => {
    // Checks the greeks_id
    const greeks = data.greeks.find(opd => opd.greeks === parseInt(req.body.greeks_id));
    if(!greeks) {
        return res.status(400).json({ "message": `greeks_id ${req.body.greeks_id} Not Found`});
    }
    if (req.body.delta) greeks.delta = req.body.delta;
    if (req.body.gamma) greeks.gamma = req.body.gamma;
    if (req.body.theta) greeks.theta = req.body.theta;
    if (req.body.vega) greeks.vega = req.body.vega;

    const filteredArray = data.greeks.filter(opg => opg.greeks_id !== parseInt(req.body.greeks_id));
    const unsortedArray = [...filteredArray, greeks];
    // we need the array in chronologically ordered
    // if the day_ID of a is greater than b, but we need a zero if they are EVEN as well so we add
    // the chained ternary statement
    data.setOptionGreeks(unsortedArray.sort((a, b) => a.greeks_id > b.greeks_id ? 1 : a.greeks_id < b.greeks_id ? -1 : 0));
    res.json(data.greeks);
}

const deleteOptionGreeks = (req,res) => {
    // Checks the greeks_id
    const greeks = data.greeks.find(opd => opd.greeks_id === parseInt(req.body.greeks_id));
    if(!greeks) {
        return res.status(400).json({ "message": `greeks_id ${req.body.greeks_id} Not Found`});
    }
    const filteredArray = data.greeks.filter(opg => opg.greeks_id !== parseInt(req.body.greeks_id));
    data.setOptionGreeks = [...filteredArray];
    res.json(data.greeks);
}

const getOptionGreek = (req, res) => {
        // Checks the greeks_id
        // using params here because it is 
        // going to pull it directly from the URL
        const greeks = data.greeks.find(opd => opd.greeks_id === parseInt(req.params.greeks_id));
        if(!greeks) {
            return res.status(400).json({ "message": `greeks_id ${req.params.greeks_id} Not Found`});
        }
        res.json(greeks);
    }

module.exports = {
    getAllOptionGreeks,
    createNewOptionGreeks,
    updateOptionGreeks,
    deleteOptionGreeks,
    getOptionGreek
}
