
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snapFilterSchema = new Schema({
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

})

module.exports = mongoose.model("SnapShotFilter", snapFilterSchema);

// /${option_type}/${option_expire_date}/${option_ticker}/${option_strike_price}