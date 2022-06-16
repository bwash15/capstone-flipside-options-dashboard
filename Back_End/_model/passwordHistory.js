const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subSchema = new Schema({
    password: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        required: false
    },
    expDate: {
        type: Date,
        required: false
    }
})

const PasswordHistorySchema = new Schema({
    email: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    pastPasswords: {
        type: [subSchema],
        default: undefined
    }
});

module.exports = mongoose.model("PasswordHistory", PasswordHistorySchema);