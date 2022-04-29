const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

var greeksSchema = new Schema({  
    delta: Number,
    gamma: Number,
    theta: Number,
    vega:  Number,    
    
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

