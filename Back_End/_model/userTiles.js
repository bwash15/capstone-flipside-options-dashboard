const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserTileSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    tilename: {
        type: String,
        required: true
    },
    tileType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("UserTile", UserTileSchema);
 