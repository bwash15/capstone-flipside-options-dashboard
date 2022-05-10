const express = require('express');
const router = express.Router();
const userController = require('../../_controllers/usersController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');


// GET ALL USERS
router.route('/')
    .get(userController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), userController.createNewUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), userController.updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:userid')
    .get(userController.getUser);

module.exports = router;
