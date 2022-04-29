const mongoose = require('mongoose');
const { Schema } = mongoose;

const detailsSchema = new Schema({
    contractType:        String,
    exercise_style:      String, 
    expiration_date:     Date, 
    shares_per_contract: Number, 
    strike_rice:         Number, 
    ticker:              String 
});

// Ensures that each instance of the Document is initialized with 
// Defaults to subdocuments
const subDetailsSchema = new mongoose.Schema({
    child: {
      type: detailsSchema,
      default: () => ({})
    }
  });
module.exports = mongoose.model('SubDetailsdoc', subDetailsSchema);

module.exports = mongoose.model('Detail', detailsSchema);