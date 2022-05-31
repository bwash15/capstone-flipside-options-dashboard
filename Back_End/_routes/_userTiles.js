const express = require('express');
const router = express.Router();
const userTilesController = require('../_controllers/userTilesController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');

console.log("IN USER TILES PLZ PRIONT")
console.log(ROLES_LIST)

router.route('/').post(verifyRoles(ROLES_LIST), userTilesController.handleUserTilesPost);
router.route('/').get(verifyRoles(ROLES_LIST), userTilesController.handleUserTilesGet)
router.route('/delete').post(verifyRoles(ROLES_LIST), userTilesController.handleUserTilesDelete);
module.exports = router;


