const { default: getDate } = require('date-fns/getDate');
const { default: getDay } = require('date-fns/getDay');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filterSchema = new Schema({
    option_type: {
        type: Number,
        default: 0.0,
        required: false
    },
    option_expire_date: {
        type: Number,
        default: 0.0,
        required: false
    },
    option_ticker: {
        type: String,
        default: "",
        required: false
    },
    option_strike_price: {
        type: Number,
        default: 0.0,
        required: false
    },
    option_ticker_link: {
        type: String,
        default: ``,
        required: false
    },
    option_multiplier: {
        type: Number,
        default: 0.0,
        required: false
    },
    option_timespan: {
        type: String,
        default: 0.0,
        required: false
    },
    option_from: {
        type: Date,
        default: () => Date.now(),
        required: false
    },
    option_to: {
        type: Date,
        default: () => Date.now(),
        required: false
    }
})

module.exports = mongoose.model("Filter", filterSchema);

// /${option_type}/${option_expire_date}/${option_ticker}/${option_strike_price}