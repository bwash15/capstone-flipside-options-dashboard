const express = require('express');
const router = express.Router();
const newsItemController = require('../_controllers/news/newsItemController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');


router.route('/addingNews').post(verifyRoles(ROLES_LIST), newsItemController.updateTileInfo);
router.route('/').post(verifyRoles(ROLES_LIST), newsItemController.tileGet)
                 .delete(verifyRoles(ROLES_LIST), newsItemController.tileDelete);

module.exports = router;


