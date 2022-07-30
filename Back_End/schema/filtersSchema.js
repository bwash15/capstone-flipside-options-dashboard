const mongoose = require('mongoose');
const { Schema } = mongoose;

const filtersSchema = new Schema({
  option_type: String,
  option_expire_date: String,
  option_ticker: String,
  option_strike_price: String,
  options_ticker_link: String,
  multiplier: String,
  timespan: String,
  from: String,
  to: String,
  link: String
});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subapiPullSchema = new mongoose.Schema({
  child: {
    type: filtersSchema,
    default: () => ({})
  }
});
module.exports = mongoose.model('SubapiPulldoc', subapiPullSchema);

module.exports = mongoose.model('ApiPull', filtersSchema);
