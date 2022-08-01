const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const greeksSchema = new Schema({
    delta: {
        type: Number,
        default: 0.00,
        required: false
    },
    gamma: {
        type: Number,
        default: 0.00,
        required: false
    },
    theta: {
        type: Number,
        default: 0.00,
        required: false
    },
    vega: {
        type: Number,
        default: 0.00,
        required: false
    },

});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
var subGreekSchema = new mongoose.Schema({
    child: {
        type: greeksSchema,
        default: () => ({})
    }
});
module.exports = mongoose.model('defGreeks', subGreekSchema);
module.exports = mongoose.model('Greek', greeksSchema);

