const mongoose = require('mongoose');
const { Schema } = mongoose;


const underlying_assetschema = new Schema({  
    change_to_break_even:   Number,
    last_updated:           Number,
    price:                  Number,
    ticker:                 String,
    timeframe:              String  
});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subUnderlyingAssetsSchema = new mongoose.Schema({
    child: {
      type: underlying_assetschema,
      default: () => ({})
    }
  });
  const SubUnderlyingAssetdoc = mongoose.model('SubUnderlyingAssetdoc', subUnderlyingAssetsSchema );

module.exports = underlying_asset('Underlying_asset', underlying_assetschema);