const express = require('express');
const router = express.Router();

// Creating an empty DATA object to retreive the data from the 
//          DATA MODEL JSON files

// This simulates the database connection 
// will be replaced by the connection to MONGODB

// This is where the [GET, POST, PUT, DELETE] go

// using [router.route()] to encapsulate both the GET
// and the POST transactions

const data = {};
data.optionDay = require('../../_data/optionDays.json')

// Retrieving the specified user account
router.route('/')
    .get((req,res) => {
        res.json(data.optionDay);
    })
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   

//  ADDING A NEW USER
    .post((req,res) => {
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
    })
//  UPDATING AN EXISTING USER ACCOUNT
    .put((req,res) => {
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
    })

    .delete((req,res) => {
        res.json({"day_id": req.body.day_id});
    });
    
/************************************************ */
//  ROUTING WITH USERID DIRECTLY FROM THE URL

router.route('/:day_id')
    .get((req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"day_id": req.params.day_id});
    });
 


module.exports = router;
