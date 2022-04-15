const express = require('express');
const router = express.Router();


const branch_controller = require('../server/controllers/controllers/branchc');



router.post('/create', branch_controller.branch_create);
router.get('/:id', branch_controller.branch_details);
router.put('/:id/update', branch_controller.branch_update);
router.delete('/:id/delete', branch_controller.branch_delete);
module.exports=router;