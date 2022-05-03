const express = require('express');
const router = express.Router();
const optionGreekCrontroller = require('../../_controllers/optionGreeksController');

router.route('/')
    .get(optionGreekCrontroller.getAllOptionGreeks)
// for the POST tranactions you have the PARAMS  
// that come in with the request and you can access them 
// with the   
    .post(optionGreekCrontroller.createNewOptionGreeks)
    .put(optionGreekCrontroller.updateOptionGreeks)
    .delete(optionGreekCrontroller.deleteOptionGreeks);
    
/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:greeks_id')
    .get(optionGreekCrontroller.getOptionGreek);

module.exports = router;
