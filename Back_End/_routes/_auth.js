const express = require('express');
const router = express.Router();
const authController = require('../_controllers/authController');

router.post('/', authController.handleLogin);

module.exports = router;
