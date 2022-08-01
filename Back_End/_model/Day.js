const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
    change: {
        Number,
        default: 0.0
    },
    change_percent: {
        Number,
        default: 0.0
    },
    close: {
        Number,
        default: 0.0
    },
    high: {
        Number,
        default: 0.0
    },
    lastUpdated: {
        String,
        default: ""
    },
    low: {
        Number,
        default: 0.0
    },
    open: {
        Date,
        default: ""
    },
    previous_close: {
        Number,
        default: 0.0
    },
    volume: {
        Number,
        default: 0.0
    },
    vwap: {
        Number,
        default: 0.0
    }
});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
// const subDaySchema = new mongoose.Schema({
//     child: {
//       type: daySchema,
//       default: () => ({})
//     }
//   });
//   module.exports= mongoose.model('SubDaydoc', subDaySchema);

module.exports = mongoose.model('Day', daySchema);
