const express = require('express');
const router = express.Router();
const profileController = require('../../_controllers/profilePageController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), profileController.getProfile)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), profileController.updateProfileInfo)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), profileController.createProfile);


router.route('/:email')
    .get(profileController.getProfile)
    .put(profileController.updateProfileInfo);

module.exports = router;
