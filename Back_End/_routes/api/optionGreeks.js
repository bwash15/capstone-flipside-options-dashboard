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
data.greeks = require('../../_data/optionGreeks.json')

// Retrieving the specified user account
router.route('/')
    .get((req,res) => {
        res.json(data.greeks);
    })
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   

//  ADDING A NEW USER
    .post((req,res) => {
        res.json({             
            "delta": req.body.delta,
            "gamma": req.body.gamma,
            "theta": req.body.theta,
            "vega":  req.body.vega  
        })
    })
//  UPDATING AN EXISTING USER ACCOUNT
    .put((req,res) => {
        res.json({            
            "delta": req.body.delta,
            "gamma": req.body.gamma,
            "theta": req.body.theta,
            "vega":  req.body.vega  
        })
    })

    .delete((req,res) => {
        res.json({"greeks_id": req.body.greeks_id});
    });
    
/************************************************ */
//  ROUTING WITH USERID DIRECTLY FROM THE URL

router.route('/:greeks_id')
    .get((req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"greeks_id": req.params.greeks_id});
    });
 


module.exports = router;
