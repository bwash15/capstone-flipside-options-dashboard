const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema({
    stockName: {
        type: String,
        required: false
    },
    news_link: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    uuid : {
        type: String,
        required: false
    }
});

const NewsTilesSchema = new Schema({

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
    userID: {
        type: String,
        required: true
    },
    tiles: {
        type: [subSchema],
        default: undefined
    }
});
module.exports = mongoose.model('news', NewsTilesSchema);