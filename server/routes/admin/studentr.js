const express = require('express');
const router = express.Router();


const student_controller = require('../server/controllers/studentc');



router.post('/create', student_controller.student_create);
router.get('/:id', student_controller.student_details);
router.put('/:id/update', student_controller.student_update);
router.delete('/:id/delete', student_controller.student_delete);
module.exports=router;