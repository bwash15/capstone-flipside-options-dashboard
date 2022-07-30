
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema_ = new Schema({
  change: Number,
  change_percent: Number,
  close: Number,
  high: Number,
  lastUpdated: String,
  low: Number,
  open: Date,
  previous_close: Number,
  volume: Number,
  vwap: Number
});

const detailsSchema_ = new Schema({
  contractType: String,
  exercise_style: String,
  expiration_date: Date,
  shares_per_contract: Number,
  strike_rice: Number,
  ticker: String
});

const greeksSchema_ = new Schema({
  delta: Number,
  gamma: Number,
  theta: Number,
  vega: Number
})

const last_quoteSchema_ = new Schema({
  ask: Number,
  ask_size: Number,
  bid: Number,
  bid_size: Number,
  last_updated: Number,
  midPoint: Number,
  timeframe: String
})

const underlying_assetSchema_ = new Schema({
  change_to_break_even: Number,
  last_updated: Number,
  price: Number,
  ticker: String,
  timeframe: String
})

const snapShotSchema_ = new Schema({
  request_id: String,
  results: {
    break_even_price: Number,
    day: { type: Schema.Types.ObjectId, ref: 'day' },
    details: { type: Schema.Types.ObjectId, ref: 'details' },
    greeks: { type: Schema.Types.ObjectId, ref: 'greeks' },
    implied_volatility: Number,
    last_quote: { type: Schema.Types.ObjectId, ref: 'last_quote' },
    open_interest: Number,
    underlying_asset: { type: Schema.Types.ObjectId, ref: 'underlying_asset' }
  },
  status: String
}
);

module.exports = mongoose.model('Day', daySchema_);
module.exports = mongoose.model('Detail', detailsSchema_);
module.exports = mongoose.model('Greek', greeksSchema_);
module.exports = mongoose.model('Last_quote', last_quoteSchema_);
module.exports = mongoose.model('Underlying_asset', underlying_assetSchema_);
module.exports = mongoose.model('SnapShot', snapShotSchema_);


