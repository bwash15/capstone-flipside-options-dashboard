const express = require('express');
const router = express.Router();
const resetPasswordController = require('../_controllers/resetPasswordController');
const passwordHistController = require('../_controllers/passwordHistoryController');

router.post('/', resetPasswordController.verifyJWT, passwordHistController.checkHistoryCount, passwordHistController.addPasswordHistory, resetPasswordController.updatePassword );

router.post('/email', resetPasswordController.checkForEmail, resetPasswordController.sendEmail);

module.exports = router;
