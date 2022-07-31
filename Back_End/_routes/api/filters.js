const express = require('express');
const router = express.Router();
const apiController = require('../../_controllers/API_pullController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(apiController.getFilters)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access them 
    // with the   
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), apiController.updateFilters)


/************************************************ */
//  ROUTING DIRECTLY FROM THE URL


module.exports = router;
