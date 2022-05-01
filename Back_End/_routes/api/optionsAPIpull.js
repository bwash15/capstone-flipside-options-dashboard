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
data.optionsAPIpull = require('../../_data/optionsAPIpull.json')

// Retrieving the specified user account
router.route('/')
    .get((req,res) => {
        res.json(data.optionsAPIpull);
    })
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   

//  ADDING A NEW USER
    .post((req,res) => {
        res.json({
            "request_id": req.body.request_id,  
            "results":  { 
              "break_even_price": req.body.break_even_price,
              "daySchema": [{  
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
              }],
              "detailsSchema": [{
                "contract_type":        req.body.contractType,
                "exercise_style":       req.body.exercise_style, 
                "expiration_date":      req.body.expiration_date, 
                "shares_per_contract":  req.body.shares_per_contract, 
                "strike_price":         req.body.strike_price, 
                "ticker":               req.body.ticker 
              }],
              "greeksSchema": [{  
                "delta": req.body.delta,
                "gamma": req.body.gamma,
                "theta": req.body.theta,
                "vega":  req.body.vega               
              }],
              "implied_volatility": req.body.implied_volatility, 
              "last_quote": [{
                "ask":          req.body.ask,
                "ask_size":     req.body.ask_size,
                "bid":          req.body.bid,
                "bid_size":     req.body.bid_size,
                "last_updated": req.body.last_updated,
                "midPoint":     req.body.midPoint, 
                "timeframe":    req.body.timeframe
              }],
              "open_interest": req.body.open_interest, 
              "underlying_assetschema": [{  
                "change_to_break_even":   req.body.change_to_break_even,
                "last_updated":           req.body.last_Updated,
                "price":                  req.body.price,
                "ticker":                 req.body.ticker,
                "timeframe":              req.body.timeframe
              }]
              },
            "status": req.body.status
        })
    })
//  UPDATING AN EXISTING USER ACCOUNT
    .put((req,res) => {
        res.json({
            "request_id": req.body.request_id,  
            "results":  { 
              "break_even_price": req.body.break_even_price,
              "daySchema": [{  
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
              }],
              "detailsSchema": [{
                "contract_type":        req.body.contractType,
                "exercise_style":       req.body.exercise_style, 
                "expiration_date":      req.body.expiration_date, 
                "shares_per_contract":  req.body.shares_per_contract, 
                "strike_price":         req.body.strike_price, 
                "ticker":               req.body.ticker 
              }],
              "greeksSchema": [{  
                "delta": req.body.delta,
                "gamma": req.body.gamma,
                "theta": req.body.theta,
                "vega":  req.body.vega               
              }],
              "implied_volatility": req.body.implied_volatility, 
              "last_quote": [{
                "ask":          req.body.ask,
                "ask_size":     req.body.ask_size,
                "bid":          req.body.bid,
                "bid_size":     req.body.bid_size,
                "last_updated": req.body.last_updated,
                "midPoint":     req.body.midPoint, 
                "timeframe":    req.body.timeframe
              }],
              "open_interest": req.body.open_interest, 
              "underlying_assetschema": [{  
                "change_to_break_even":   req.body.change_to_break_even,
                "last_updated":           req.body.last_Updated,
                "price":                  req.body.price,
                "ticker":                 req.body.ticker,
                "timeframe":              req.body.timeframe
              }]
              },
            "status": req.body.status
        })
    })

    .delete((req,res) => {
        res.json({"apiPull_id": req.body.apiPull_id});
    });
    
/************************************************ */
//  ROUTING WITH USERID DIRECTLY FROM THE URL

router.route('/:apiPull_id')
    .get((req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"apiPull_id": req.params.apiPull_id});
    });
 


module.exports = router;
