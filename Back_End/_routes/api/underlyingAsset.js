const express = require('express');
const router = express.Router();
const underlyingAssetController = require('../../_controllers/underLyingAssetController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(underlyingAssetController.getAllUnderlyingAssets)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access them 
    // with the   
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), underlyingAssetController.createNewUnderlyingAsset)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), underlyingAssetController.updateUnderlyingAsset)
    .delete(verifyRoles(ROLES_LIST.Admin), underlyingAssetController.deleteUnderlyingAsset);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:underlyingAssetid')
    .get(underlyingAssetController.getUnderlyingAsset);

module.exports = router;
