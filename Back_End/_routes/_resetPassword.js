const express = require('express');
const router = express.Router();
const resetPasswordController = require('../_controllers//resetPasswordController');

router.post('/', resetPasswordController.updatePassword);

module.exports = router;
