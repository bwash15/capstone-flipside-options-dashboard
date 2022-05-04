const express = require('express');
const router = express.Router();
const userController = require('../../_controllers/usersController');


// GET ALL USERS
router.route('/').get(userController.getAllUsers)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   
    .post(userController.createNewUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
    
/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:userid')
    .get(userController.getUser);
    
module.exports = router;
