const mongoose = require('mongoose');
const { Schema } = mongoose;


const oSS_schema = new Schema({
    request_id: {
        type: String
    },
    results: {
        break_even_price: Number,
        day: [{
            change: Number,
            change_percent: Number,
            close: Number,
            high: Number,
            last_updated: String,
            low: Number,
            open: Number,
            previous_close: Number,
            volume: Number,
            vwap: Number
        }],
        details: [{
            contractType: String,
            exercise_style: String,
            expiration_date: Number,
            shares_per_contract: Number,
            strike_rice: Number,
            ticker: String
        }],
        greeks: [{
            delta: Number,
            gamma: Number,
            theta: Number,
            vega: Number,

        }],
        implied_volatility: Number,
        last_quote: [{
            ask: Number,
            ask_size: Number,
            bid: Number,
            bid_size: Number,
            last_updated: Number,
            midPoint: Number,
            timeframe: String
        }],
        open_interest: Number,
        underlying_asset: [{
            change_to_break_even: Number,
            last_updated: Number,
            price: Number,
            ticker: String,
            timeframe: String
        }],
    },
    status: String
});



module.exports = mongoose.model('OptionsAPIpull', oSS_schema);