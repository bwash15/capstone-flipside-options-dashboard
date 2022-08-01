const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;


const last_quoteSchema = new Schema({
    ask: {
        type: Number,
        required: false,
        default: 0.00
    },
    ask_size: {
        type: Number,
        required: false,
        default: 0.00
    },
    bid: {
        type: Number,
        required: false,
        default: 0.00
    },
    bid_size: {
        type: Number,
        required: false,
        default: 0.00
    },
    last_updated: {
        type: String,
        required: false,
        default: ""
    },
    midPoint: {
        type: Number,
        required: false,
        default: 0.00
    },
    timeframe: {
        type: String,
        required: false,
        default: ""
    }
});


// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subLastQuoteSchema = new mongoose.Schema({
    child: {
        type: last_quoteSchema,
        default: () => ({})
    }
});
module.exports = mongoose.model('subLastQuotedoc', subLastQuoteSchema);

module.exports = mongoose.model("LastQuote", last_quoteSchema);