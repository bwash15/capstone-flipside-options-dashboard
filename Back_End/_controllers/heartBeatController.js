const snapShots = require('../schema/SnapShotSchema');
const day = require('../schema/day');
const details = require('../schema/details');
const greeks = require('../schema/greeks');
const last_quote = require('../schema/last_quote');
const underlying_asset = require('../schema/underlying_asset');
const { request } = require('express');
const logServerEvents = require('../logServerEvents')


const handleHeartbeat = async (req, res) => {

    // pulling out the separate fields from the body of the request
    const {
        request_id,
        results,
        break_even_price,
        day,
        details,
        greeks,
        implied_volatility,
        last_quote,
        open_interest,
        underlying_asset,
    } = req.body;

    if (!request_id) return res.status(400).json({ 'message': 'No request_id found' });
    if (!results) return res.status(400).json({ 'message': 'No results found' });
    if (!break_even_price) return res.status(400).json({ 'message': 'No Break Even Price found' });
    if (!day) return res.status(400).json({ 'message': 'No Day info found' });
    if (!details) return res.status(400).json({ 'message': 'No Details found' });
    if (!greeks) return res.status(400).json({ 'message': 'No Greeks found' });
    if (!implied_volatility) return res.status(400).json({ 'message': 'No Implied Volatility found' });
    if (!last_quote) return res.status(400).json({ 'message': 'No Last Quote found' });
    if (!open_interest) return res.status(400).json({ 'message': 'No Open Interest found' });
    if (!underlying_asset) return res.status(400).json({ 'message': 'No Underlying Interest found' });

    // checks for duplicate request_ids
    const duplicate = await snapShotSchema.findOne({ request_id: snapShotSchema }).exec();
    // throw 409 if a duplicate is found
    if (duplicate) return res.sendStatus(409); // 409 stands for Conflict

    try {
        // Create and Store the new snapShot
        const result = await snapShotSchema.create({
            "request_id": request_id,

        });
        console.log(result);
        res.status(201).json({ 'success': `SnapShot ${request_id} loaded into database` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleHeartbeat };

