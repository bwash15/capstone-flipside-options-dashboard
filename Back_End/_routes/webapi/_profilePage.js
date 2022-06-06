const express = require('express');
const router = express.Router();
const profileController = require('../../_controllers/profilePageController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST, ROLES_LIST), profileController.getProfile)
    .put(verifyRoles(ROLES_LIST, ROLES_LIST), profileController.updateProfileInfo)
    .post(verifyRoles(ROLES_LIST, ROLES_LIST), profileController.createProfile);


router.route('/email')
    .post(profileController.sendEmail)
    .put(profileController.updateProfileInfo);

module.exports = router;
