const express = require('express');
const router = express.Router();
const optionGreekCrontroller = require('../../_controllers/optionGreeksController');
const ROLES_LIST = require('../../_config/roles_list');
const verifyRoles = require('../../_middleware/verifyRoles');

router.route('/')
    .get(optionGreekCrontroller.getAllOptionGreeks)
    // for the POST tranactions you have the PARAMS  
    // that come in with the request and you can access them 
    // with the   
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionGreekCrontroller.createNewOptionGreeks)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), optionGreekCrontroller.updateOptionGreeks)
    .delete(verifyRoles(ROLES_LIST.Admin), optionGreekCrontroller.deleteOptionGreeks);

/************************************************ */
//  ROUTING DIRECTLY FROM THE URL
router.route('/:greeks_id')
    .get(optionGreekCrontroller.getOptionGreek);

module.exports = router;
