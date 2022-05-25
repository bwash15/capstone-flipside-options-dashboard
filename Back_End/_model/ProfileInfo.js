const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileInfoSchema = new Schema({
    firstname: {
        String,
        default: {}
    },
    lastname: {
        String,
        default: {}
    },
    email: {
        String,
        default: {}
    },

});

module.exports = mongoose.model('ProfileInfo', profileInfoSchema)