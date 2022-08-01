const express = require('express');
const router = express.Router();
const optionDayController = require('../../_controllers/optionDaysController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(optionDayController.getAllOptionDays)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access them 
    // with the   
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionDayController.createNewOptionDays)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionDayController.updateOptionDays)
    .delete(verifyRoles(ROLES_LIST.Admin), optionDayController.deleteOptionDays);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:id')
    .get(optionDayController.getOptionDay);

module.exports = router;
