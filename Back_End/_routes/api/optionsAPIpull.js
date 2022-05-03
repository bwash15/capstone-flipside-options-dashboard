const express = require('express');
const router = express.Router();
const optionAPIpullController = require('../../_controllers/optionAPIController');


router.route('/')
//  GET ALL API PULLS
    .get(optionAPIpullController.getAllOptionAPIpulls)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access the data within
// with the params keyword

//  ADDING A NEW OPTION API PULL
    .post(optionAPIpullController.createNewOptionAPIpull)
//  UPDATING AN EXISTING OPTION API PULL
    .put(optionAPIpullController.updateOptionAPIpull)
//  DELETEING AN EXISTING OPTION API PULL
    .delete(optionAPIpullController.deleteOptionsAPIpull);
    
/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:apiPull_id')
    .get(optionAPIpullController.getOptionsAPIpull); 

module.exports = router;
