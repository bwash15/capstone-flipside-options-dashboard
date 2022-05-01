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
data.users = require('../../_data/users.json')

// Retrieving the specified user account
router.route('/')
    .get((req,res) => {
        res.json(data.users);
    })
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   

//  ADDING A NEW USER
    .post((req,res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "password": req.body.password,
            "role": req.body.role
        })
    })
//  UPDATING AN EXISTING USER ACCOUNT
    .put((req,res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "password": req.body.password,
            "role": req.body.role
        })
    })

    .delete((req,res) => {
        res.json({"userid": req.body.userid});
    });
    
/************************************************ */
//  ROUTING WITH USERID DIRECTLY FROM THE URL

router.route('/:userid')
    .get((req, res) => {
    // using params here because it is 
    // going to pull it directly from the URL
        res.json({"userid": req.params.userid});
    });

    
module.exports = router;
