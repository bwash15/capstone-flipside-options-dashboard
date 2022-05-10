const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
    change: {
        Number,
        default: {}
    },
    change_percent: {
        Number,
        default: {}
    },
    close: {
        Number,
        default: {}
    },
    high: {
        Number,
        default: {}
    },
    lastUpdated: {
        String,
        default: {}
    },
    low: {
        Number,
        default: {}
    },
    open: {
        Date,
        default: {}
    },
    previous_close: {
        Number,
        default: {}
    },
    volume: {
        Number,
        default: {}
    },
    vwap: {
        Number,
        default: {}
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
