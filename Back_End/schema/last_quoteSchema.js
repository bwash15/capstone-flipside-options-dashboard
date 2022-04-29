const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;


const last_quote = new Schema({
    ask:          Number,
    ask_size:     Number,
    bid:          Number,
    bid_size:     Number,
    last_updated: Number,
    midPoint:     Number, 
    timeframe:    String
});

  
// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subLastQuoteSchema = new mongoose.Schema({
    child: {
      type: last_quote,
      default: () => ({})
    }
  });
module.exports = mongoose.model('subLastQuotedoc', subLastQuoteSchema);

module.exports = mongoose.model("LastQuote", last_quote);