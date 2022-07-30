const express = require('express');
const router = express.Router();
const snapShotAPIpullController = require('../../_controllers/snapShotAPIController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');


router.route('/')
    //  GET ALL API PULLS
    .get(snapShotAPIpullController.GetAllSnapShotAPIpulls)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access the data within
    // with the params keyword

    //  ADDING A NEW OPTION API PULL
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), snapShotAPIpullController.CreateNewSnapShotAPIpull)
    //  UPDATING AN EXISTING OPTION API PULL
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), snapShotAPIpullController.UpdateSnapShotAPIpull)
    //  DELETEING AN EXISTING OPTION API PULL
    .delete(verifyRoles(ROLES_LIST.Admin), snapShotAPIpullController.DeleteSnapShotAPIpull);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:_id')
    .get(snapShotAPIpullController.GetSnapShotAPIpull);

module.exports = router;
