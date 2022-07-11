const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AllOptions = new Schema({
    
    underlying_ticker: {
        type: String,
        required: true
    },
    cfi: {
        type: String,
        required: true
    },
    contract_type: {
        type: String,
        required: true
    },
    exercise_style: {
        type: String,
        required: true
    },
    expiration_date: {
        type: String,
        required: true
    },
    primary_exchange: {
        type: String,
        required: true
    },
    shares_per_contract: {
        type: Number,
        required: true
    },
    strike_price: {
        type: Number,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
});





module.exports = mongoose.model("TopOptions", AllOptions);