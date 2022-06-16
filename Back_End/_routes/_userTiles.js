const express = require('express');
const router = express.Router();
const optionTilesController = require('../_controllers/optionTilesController');
const newsController = require('../_controllers/newsTilesController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');


router.route('/options').post(verifyRoles(ROLES_LIST), optionTilesController.handleUserTilesPost)
                        .get(verifyRoles(ROLES_LIST), optionTilesController.handleUserTilesGet)
                        .delete(verifyRoles(ROLES_LIST), optionTilesController.handleUserTilesDelete);

router.route('/news').post(verifyRoles(ROLES_LIST), newsController.handleNewsTilePost)
                     .get(verifyRoles(ROLES_LIST), newsController.handleNewsTileGet)
                     .delete(verifyRoles(ROLES_LIST), newsController.handleNewsTileDelete);
module.exports = router;


