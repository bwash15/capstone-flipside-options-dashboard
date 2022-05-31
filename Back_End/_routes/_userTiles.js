const express = require('express');
const router = express.Router();
const userTilesController = require('../_controllers/userTilesController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');


router.route('/').post(verifyRoles(ROLES_LIST), userTilesController.handleUserTilesPost)
                 .get(verifyRoles(ROLES_LIST), userTilesController.handleUserTilesGet)
                 .delete(verifyRoles(ROLES_LIST), userTilesController.handleUserTilesDelete);

module.exports = router;


