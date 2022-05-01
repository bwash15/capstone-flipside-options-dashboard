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
data.underlyingAsset = require('../../_data/underlyingAsset.json')

// Retrieving the specified user account
router.route('/')
    .get((req,res) => {
        res.json(data.underlyingAsset);
    })
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   

//  ADDING A NEW USER
    .post((req,res) => {
        res.json({             
            "change_to_break_even":   req.body.change_to_break_even,
            "last_updated":           req.body.last_updated,
            "price":                  req.body.price,
            "ticker":                 req.body.ticker,
            "timeframe":              req.body.timeframe  
        })
    })
//  UPDATING AN EXISTING USER ACCOUNT
    .put((req,res) => {
        res.json({            
            "change_to_break_even":   req.body.change_to_break_even,
            "last_updated":           req.body.last_updated,
            "price":                  req.body.price,
            "ticker":                 req.body.ticker,
            "timeframe":              req.body.timeframe  
        })
    })

    .delete((req,res) => {
        res.json({"underlyingAssetid": req.body.underlyingAssetid});
    });
    
/************************************************ */
//  ROUTING WITH USERID DIRECTLY FROM THE URL

router.route('/:underlyingAssetid')
    .get((req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"underlyingAssetid": req.params.underlyingAssetid});
    });
 


module.exports = router;
