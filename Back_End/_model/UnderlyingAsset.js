const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;


const underlying_assetSchema = new Schema({
    underlying_asset: {
        change_to_break_even: {
            type: Number,
            default: 0.00,
            required: false
        },
        last_updated: {
            type: Number,
            default: 0.00,
            required: false
        },
        price: {
            type: Number,
            default: 0.00,
            required: false
        },
        ticker: {
            type: String,
            default: "",
            required: false
        },
        timeframe: {
            type: String,
            default: "",
            required: false
        }
    }
});


// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subUnderlyingAssetSchema = new mongoose.Schema({
    child: {
        type: [underlying_assetSchema],
        default: () => ({})
    }
});
module.exports = mongoose.model('subunderlying_assetdoc', subUnderlyingAssetSchema);

module.exports = mongoose.model("UnderlyingAsset", underlying_assetSchema);