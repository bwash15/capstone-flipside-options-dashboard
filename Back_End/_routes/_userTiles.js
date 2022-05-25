const express = require('express');
const router = express.Router();
const path = require('path');
const userTilesController = require('../_controllers/userTilesController');

router.post('/userTiles', userTilesController.handleUserTilesPost);
router.get('/userTiles', userTilesController.handleUserTilesGet)
module.exports = router;


