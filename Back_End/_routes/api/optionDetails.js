const express = require('express');
const router = express.Router();
const optionDetailsController = require('../../_controllers/optionDetailsController');

router.route('/')
    .get(optionDetailsController.getAllOptionDetails)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   
    .post(optionDetailsController.createNewOptionDetails)
    .put(optionDetailsController.updateOptionDetails)
    .delete(optionDetailsController.deleteOptionDetails);
    
/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:details_id')
    .get(optionDetailsController.getOptionDetails);

module.exports = router;
