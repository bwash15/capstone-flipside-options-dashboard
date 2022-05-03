const express = require('express');
const router = express.Router();
const underlyingAssetController = require('../../_controllers/underLyingAssetController');

router.route('/')
    .get(underlyingAssetController.getAllUnderlyingAssets)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   
    .post(underlyingAssetController.createNewUnderlyingAsset)
    .put(underlyingAssetController.updateUnderlyingAsset)
    .delete(underlyingAssetController.deleteUnderlyingAsset);
    
/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:underlyingAssetid')
    .get(underlyingAssetController.getUnderlyingAsset);

module.exports = router;
