const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const student_controller = require('../controllers/studentc');


// a simple test url to check that all of our files are communicating correctly.
router.post('/create', student_controller.student_create);
router.get('/:id', student_controller.student_details);
router.put('/:id/update', student_controller.student_update);
router.delete('/:id/delete', student_controller.student_delete);
module.exports=router;