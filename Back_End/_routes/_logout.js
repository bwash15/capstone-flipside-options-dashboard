/**
 * Copied from _auth route and updated for the logoutController 
 */

const express = require('express');
const router = express.Router();
const logoutController = require('../_controllers/logoutController');
// Changed from POST to a GET 
router.get('/', logoutController.handleLogout);

module.exports = router;
