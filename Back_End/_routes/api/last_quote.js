const express = require('express');
const router = express.Router();
const optionLastQuoteController = require('../../_controllers/optionLastQuoteController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(optionLastQuoteController.getAllOptionLastQuotes)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access them 
    // with the   
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionLastQuoteController.createNewOptionLastQuote)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionLastQuoteController.updateOptionLastQuote)
    .delete(verifyRoles(ROLES_LIST.Admin), optionLastQuoteController.deleteOptionLastQuote);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:lastQuote_id')
    .get(optionLastQuoteController.getOneOptionLastQuote);

module.exports = router;
