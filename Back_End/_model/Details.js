const mongoose = require('mongoose');
const { Schema } = mongoose;

const detailsSchema = new Schema({
    contractType: {
        type: String,
        required: false,
        default: ""
    },
    exercise_style: {
        type: String,
        required: false,
        default: ""
    },
    expiration_date: {
        type: Date,
        required: false,
        default: ""
    },
    shares_per_contract: {
        type: Number,
        required: false,
        default: 0.00
    },
    strike_price: {
        type: Number,
        required: false,
        default: 0.00
    },
    ticker: {
        type: String,
        required: false,
        default: ""
    }

});

// // Ensures that each instance of the Document is initialized with 
// // Defaults to subdocuments
// const subDetailsSchema = new mongoose.Schema({
//     child: {
//         type: detailsSchema,
//         default: () => ({})
//     }
// });
// module.exports = mongoose.model('SubDetailsdoc', subDetailsSchema);

module.exports = mongoose.model('Detail', detailsSchema);