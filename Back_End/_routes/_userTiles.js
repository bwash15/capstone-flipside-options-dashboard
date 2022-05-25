const express = require('express');
const router = express.Router();
const path = require('path');
const userTilesController = require('../_controllers/userTilesController');

router.post('/', userTilesController.handleUserTilesPost);
router.get('/', userTilesController.handleUserTilesGet)
module.exports = router;


