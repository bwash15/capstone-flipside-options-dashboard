const express = require('express');
const router = express.Router();
const profileController = require('../../_controllers/profilePageController');

router.route('/')
    .post(profileController.getProfile)
    .put(profileController.updateProfileInfo);


router.route('/email')
    .post(profileController.sendEmail)
    .put(profileController.updateProfileInfo);

router.route('/updatePassword')
    .put(profileController.updatePassword);
module.exports = router;
