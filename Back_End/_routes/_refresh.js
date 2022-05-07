/**
 * Copied from _auth route and updated for the refreshToken Controller 
 */

const express = require('express');
const router = express.Router();
const refreshTokenController = require('../_controllers/refreshTokenController');
// Changed from POST to a GET 
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
