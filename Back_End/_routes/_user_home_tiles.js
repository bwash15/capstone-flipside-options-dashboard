const express = require('express');
const router = express.Router();
const homeTilesController = require('../_controllers/homeTilesController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');


router.route('/post').post(verifyRoles(ROLES_LIST), homeTilesController.handleUserTilesPost)
router.route('/get').post(verifyRoles(ROLES_LIST), homeTilesController.handleUserTilesGet)

                        

module.exports = router;
