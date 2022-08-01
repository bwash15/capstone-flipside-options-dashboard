const express = require('express');
const router = express.Router();

const loadAnalytics = require('../../_middleware/loadAnalytics');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(loadAnalytics.getFilters)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   



/************************************************ */
//  ROUTING DIRECTLY FROM THE URL


module.exports = router;
