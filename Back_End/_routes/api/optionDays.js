const express = require('express');
const router = express.Router();
const optionDayController = require('../../_controllers/optionDaysController');

router.route('/')
    .get(optionDayController.getAllOptionDays)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   
    .post(optionDayController.createNewOptionDays)
    .put(optionDayController.updateOptionDays)
    .delete(optionDayController.deleteOptionDays);
    
/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:day_id')
    .get(optionDayController.getOptionDays);

module.exports = router;
