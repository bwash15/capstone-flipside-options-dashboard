const express = require('express');
const router = express.Router();
const optionLastQuoteController = require('../../_controllers/optionLastQuoteController');

router.route('/')
    .get(optionLastQuoteController.getAllOptionLastQuotes)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   
    .post(optionLastQuoteController.createNewOptionLastQuote)
    .put(optionLastQuoteController.updateOptionLastQuote)
    .delete(optionLastQuoteController.deleteOptionLastQuote);
    
/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:lastQuote_id')
    .get(optionLastQuoteController.getOneOptionLastQuote);

module.exports = router;
