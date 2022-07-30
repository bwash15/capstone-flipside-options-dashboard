const express = require('express');
const router = express.Router();
const optionDetailsController = require('../../_controllers/optionDetailsController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(optionDetailsController.getAllOptionDetails)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access them 
    // with the   
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionDetailsController.createNewOptionDetails)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionDetailsController.updateOptionDetails)
    .delete(verifyRoles(ROLES_LIST.Admin), optionDetailsController.deleteOptionDetail);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:details_id')
    .get(optionDetailsController.getOptionDetail);

module.exports = router;
