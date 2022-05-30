const express = require('express');
const router = express.Router();
const path = require('path');
const userTilesController = require('../_controllers/userTilesController');

router.post('/', userTilesController.handleUserTilesPost);
router.post('/get', userTilesController.handleUserTilesGet)
router.post('/delete', userTilesController.handleUserTilesDelete);
module.exports = router;


