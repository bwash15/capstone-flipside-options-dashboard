const express = require('express');
const router = express.Router();
const profileController = require('../../_controllers/profilePageController');
const resetPasswordController = require('../../_controllers/resetPasswordController');

router.route('/')
    .post(profileController.getProfile)
    .put(profileController.updateProfileInfo);


router.route('/email')
    .post(resetPasswordController.sendEmail)
    .put(profileController.updateProfileInfo);

module.exports = router;
