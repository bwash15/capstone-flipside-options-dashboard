const snapShotSchema = require('../schema/SnapShotSchema');
const bcrypt = require('bcrypt');
const { request } = require('express');
const logServerEvents = require('./../logServerEvents')


const handleSnapShotHeartbeat = async (req, res) => {
    const {
        request_id, results, break_even_price, day, details,
        greeks, implied_volatility, last_quote, open_interest,
        underlying_asset    
    } = req.body;

    if(!request_id) return res.status(400).json({'message': 'No request_id found'});
    if(!results) return res.status(400).json({'message': 'No results found'});
    if(!break_even_price) return res.status(400).json({'message': 'No Break Even Price found'});
    if(!day) return res.status(400).json({'message': 'No Day info found'});
    if(!details) return res.status(400).json({'message': 'No Details found'});
    if(!greeks) return res.status(400).json({'message': 'No Greeks found'});
    if(!implied_volatility) return res.status(400).json({'message': 'No Implied Volatility found'});
    if(!last_quote) return res.status(400).json({'message': 'No Last Quote found'});
    if(!open_interest) return res.status(400).json({'message': 'No Open Interest found'});
    if(!underlying_asset) return res.status(400).json({'message': 'No Underlying Interest found'});

    // checks for duplicate request_ids
    const duplicate = await SnapSHotSchema.findOne({ request_id: snapShotSchema }).exec();
    // throw 409 if a duplicate is found
    if(duplicate) return res.sendStatus(409); // 409 stands for Conflict

    try{
        // Encrypting the password > adds the hash and the salt to the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // Create and Store the new user
        const result = await User.create( {
            "username" : user,            
            "password": hashedPwd
        });
        console.log(result);

        res.status(201).json({'success' : `New User ${user} created`});      
        


    }catch(err){
        res.status(500).json({ 'message' : err.message });
    }



}







