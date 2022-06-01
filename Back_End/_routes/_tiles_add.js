const express = require('express');
const router = express.Router();
const TilesController = require('../_controllers/TilesController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');

router.route('/').post(verifyRoles(ROLES_LIST), TilesController.updateTileInfo)


module.exports = router;


