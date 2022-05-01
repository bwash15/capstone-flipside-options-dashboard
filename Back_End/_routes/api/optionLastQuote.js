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
data.lastQuote = require('../../_data/optionLastQuote.json');

// Retrieving the specified user account
router.route('/')
    .get((req,res) => {
        res.json(data.lastQuote);
    })
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   

//  ADDING A NEW USER
    .post((req,res) => {
        res.json({    
            "ask":          req.body.ask,
            "ask_size":     req.body.ask_size,
            "bid":          req.body.bid,
            "bid_size":     req.body.bid_size,
            "last_updated": req.body.last_updated,
            "midPoint":     req.body.midPoint, 
            "timeframe":    req.body.timeframe
        })
    })
//  UPDATING AN EXISTING USER ACCOUNT
    .put((req,res) => {
        res.json({            
            "ask":          req.body.ask,
            "ask_size":     req.body.ask_size,
            "bid":          req.body.bid,
            "bid_size":     req.body.bid_size,
            "last_updated": req.body.last_updated,
            "midPoint":     req.body.midPoint, 
            "timeframe":    req.body.timeframe
        })
    })

    .delete((req,res) => {
        res.json({"lastQuote_id": req.body.lastQuote_id});
    });
    
/************************************************ */
//  ROUTING WITH USERID DIRECTLY FROM THE URL

router.route('/:lastQuote_id')
    .get((req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"lastQuote_id": req.params.lastQuote_id});
    });
 


module.exports = router;
