const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subSchema = new Schema({
    tileName: {
        type: String,
        required: false
    },
})


const UserHomeTilesSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    tileNames: {
        type: [subSchema],
        default: undefined
    }
});

module.exports = mongoose.model("UserHomeTiles", UserHomeTilesSchema);