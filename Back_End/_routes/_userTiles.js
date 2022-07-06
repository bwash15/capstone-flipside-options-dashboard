const express = require('express');
const router = express.Router();
const optionTilesController = require('../_controllers/optionTilesController');
const newsController = require('../_controllers/newsTilesController');
const ROLES_LIST = require('../_config/roles_list');
const verifyRoles = require('../_middleware/verifyRoles');


router.route('/options').post(verifyRoles(ROLES_LIST), optionTilesController.handleUserTilesPost)
                        .delete(verifyRoles(ROLES_LIST), optionTilesController.handleUserTilesDelete);
router.route('/options/get').post(verifyRoles(ROLES_LIST), optionTilesController.handleUserTilesGet)

router.route('/news').post(verifyRoles(ROLES_LIST), newsController.handleNewsTilePost)
                     .delete(verifyRoles(ROLES_LIST), newsController.handleNewsTileDelete);
router.route('/news/get').post(verifyRoles(ROLES_LIST), newsController.handleNewsTileGet)

module.exports = router;


