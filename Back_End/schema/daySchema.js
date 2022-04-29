const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({  
    change:         Number,
    change_percent: Number,
    close:          Number,
    high:           Number,
    lastUpdated:    String, 
    low:            Number,
    open:           Date,
    previous_close: Number, 
    volume:         Number, 
    vwap:           Number  
});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subDaySchema = new mongoose.Schema({
    child: {
      type: daySchema,
      default: () => ({})
    }
  });
  module.exports= mongoose.model('SubDaydoc', subDaySchema);

  module.exports = mongoose.model('Day', daySchema);
