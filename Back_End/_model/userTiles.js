const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subSchema = new Schema({
    stockName: {
        type: String,
        required: false
    },
    stockPrice: {
        type: Number,
        required: false
    },
    premium: {
        type: Number,
        required: false
    },
    expDate: {
        type: Date,
        required: false
    },
    uuid: {
        type: String,
        required: true
    },
})

const UserTileSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    tileName: {
        type: String,
        required: true
    },
    tileType: {
        type: String,
        required: true
    },
    tiles: {
        type: [subSchema],
        default: undefined
    }
});

module.exports = mongoose.model("UserTile", UserTileSchema);
 