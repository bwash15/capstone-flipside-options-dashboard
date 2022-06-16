const express = require('express');
const router = express.Router();
const optionTileController = require('../_controllers/options/optionTilesController');
const newsController = require('../_controllers/news/newsTilesController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');


router.route('/options').post(verifyRoles(ROLES_LIST), optionTileController.handleUserTilesPost)
                        .get(verifyRoles(ROLES_LIST), optionTileController.handleUserTilesGet)
                        .delete(verifyRoles(ROLES_LIST), optionTileController.handleUserTilesDelete);

router.route('/news').post(verifyRoles(ROLES_LIST), newsController.handleNewsTilePost)
                     .get(verifyRoles(ROLES_LIST), newsController.handleNewsTileGet)
                     .delete(verifyRoles(ROLES_LIST), newsController.handleNewsTileDelete);
module.exports = router;


