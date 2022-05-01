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
data.optionDetails = require('../../_data/optionDetails.json')

// Retrieving the specified user account
router.route('/')
    .get((req,res) => {
        res.json(data.optionDetails);
    })
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   

//  ADDING A NEW USER
    .post((req,res) => {
        res.json({             
            "contract_type":          req.body.contract_type,
            "exercise_style":         req.body.exercise_style, 
            "expiration_date":        req.body.expiration_date, 
            "shares_per_contract":    req.body.shares_per_contract,
            "strike_price":           req.body.strike_price, 
            "ticker":                 req.body.ticker 
        })
    })
//  UPDATING AN EXISTING USER ACCOUNT
    .put((req,res) => {
        res.json({            
            "contract_type":          req.body.contract_type,
            "exercise_style":         req.body.exercise_style, 
            "expiration_date":        req.body.expiration_date, 
            "shares_per_contract":    req.body.shares_per_contract,
            "strike_price":           req.body.strike_price, 
            "ticker":                 req.body.ticker 
        })
    })

    .delete((req,res) => {
        res.json({"details_id": req.body.details_id});
    });
    
/************************************************ */
//  ROUTING WITH USERID DIRECTLY FROM THE URL

router.route('/:details_id')
    .get((req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"details_id": req.params.details_id});
    });
 


module.exports = router;
