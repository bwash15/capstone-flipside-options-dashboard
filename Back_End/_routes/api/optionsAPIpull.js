const express = require('express');
const router = express.Router();
const optionAPIpullController = require('../../_controllers/optionAPIController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');


router.route('/')
    //  GET ALL API PULLS
    .get(optionAPIpullController.getAllOptionAPIpulls)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access the data within
    // with the params keyword

    //  ADDING A NEW OPTION API PULL
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionAPIpullController.createNewOptionAPIpull)
    //  UPDATING AN EXISTING OPTION API PULL
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionAPIpullController.updateOptionAPIpull)
    //  DELETEING AN EXISTING OPTION API PULL
    .delete(verifyRoles(ROLES_LIST.Admin), optionAPIpullController.deleteOptionsAPIpull);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:apiPull_id')
    .get(optionAPIpullController.getOptionsAPIpull);

module.exports = router;
