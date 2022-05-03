
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const snapShotSchema = new Schema({
    request_id: String,      
    break_even_price: Number,
    day: [{ type: Schema.Types.ObjectId, ref: 'daySchema' }],
    details: [{ type: Schema.Types.ObjectId, ref: 'detailsSchema' }],
    last_quote: [{ type: Schema.Types.ObjectId, ref: 'last_quoteSchema' }],
    underlying_asset: [{ type: Schema.Types.ObjectId, ref: 'underlyingAssetSchema' }],
    greeks: [{ type: Schema.Types.ObjectId, ref: 'greeksSchema' }],
    implied_volatility: Number, 
    open_interest: Number, 
    status: String    
});

module.exports = mongoose.model('SnapShotSchema', snapShotSchema);