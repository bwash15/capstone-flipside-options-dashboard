const express = require('express');
const router = express.Router();
const optionItemController = require('../_controllers/options/optionItemController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');


router.route('/addingOption').post(verifyRoles(ROLES_LIST), optionItemController.updateTileInfo);
router.route('/').post(verifyRoles(ROLES_LIST), optionItemController.tileGet)
                 .delete(verifyRoles(ROLES_LIST), optionItemController.tileDelete);

module.exports = router;


