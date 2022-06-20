const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../_controllers/registerController');
const passwordHistController = require('../_controllers/passwordHistoryController');

router.post('/', registerController.handleNewUser, passwordHistController.createPasswordHistory);

module.exports = router;


