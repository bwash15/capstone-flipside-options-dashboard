const express = require('express');
const router = express.Router();
const profileController = require('../../_controllers/profilePageController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .post(profileController.getProfile)
    .put(profileController.updateProfileInfo);


router.route('/email')
    .post(profileController.sendEmail)
    .put(profileController.updateProfileInfo);

module.exports = router;
