const express = require('express');
const router = express.Router();


const subject_controller = require('../controllers/subjectc');



router.post('/create', subject_controller.subject_create);
router.get('/:id', subject_controller.subject_details);
router.put('/:id/update', subject_controller.subject_update);
router.delete('/:id/delete', subject_controller.subject_delete);
module.exports=router;