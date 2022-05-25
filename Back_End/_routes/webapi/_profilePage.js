const express = require('express');
const router = express.Router();
const profileController = require('../../_controllers/profilePageController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(profileController.getProfile)
    .put(verifyRoles(ROLES_LIST.Editor), profileController.updateProfileInfo);

module.exports = router;
