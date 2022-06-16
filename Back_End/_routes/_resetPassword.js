const express = require('express');
const router = express.Router();
const resetPasswordController = require('../_controllers//resetPasswordController');

router.post('/', resetPasswordController.updatePassword);

router.post('/email', resetPasswordController.checkForEmail);

module.exports = router;
