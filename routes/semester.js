const express = require('express');
const router = express.Router();


const semester_controller = require('../controllers/semesterc');



router.post('/create', semester_controller.semester_create);
router.get('/:id', semester_controller.semester_details);
router.put('/:id/update', semester_controller.semester_update);
router.delete('/:id/delete', semester_controller.semester_delete);
module.exports=router;