const express = require('express');
const router = express.Router();


// const branch_controller = require('../server/controllers/controllers/branchc');
// const semester_controller = require('../server/controllers/controllers/semesterc');
// const subject_controller = require('../server/controllers/subjectc');
// const student_controller = require('../../controllers/studentc');
router.get('/', (req, res) => {
    
    res.render('adminhome');

});
router.get('/admin/managestudent', (req, res) => {
    
    res.render('managestudent');  

});
router.get('/admin/managestudent/addnewstudent', (req, res) => {
    
    res.render('addnewstudent');  

});
router.get('/admin/managestudent/addnewstudent', (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        User.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        User.find()
            .then(newUser => {
               
      res.render('managestudent', { posts: newUser });
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
});
router.delete('/admin/managestudent/delete/id', function (req, res) {
    Student.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
    
});

// router.get('admin/semester', semester_controller.semester);
// router.get('admin/', semester_controller.semester);
// router.post('admin/semester/create', semester_controller.semester_create);
// router.get('admin/semester/:id', semester_controller.semester_details);
// router.put('admin/semester/:id/update', semester_controller.semester_update);
// router.delete('admin/semester/:id/delete', semester_controller.semester_delete);
// router.post('admin/branch/create', branch_controller.branch_create);
// router.get('admin/branch/:id', branch_controller.branch_details);
// router.put('admin/branch/:id/update', branch_controller.branch_update);
// router.delete('admin/:id/delete', branch_controller.branch_delete);
// router.post('admin/subject/create', subject_controller.subject_create);
// router.get('admin/subject/:id', subject_controller.subject_details);
// router.put('admin/subject/:id/update', subject_controller.subject_update);
// router.delete('admin/subject/:id/delete', subject_controller.subject_delete);
// router.post('admin/subject/create', student_controller.student_create);
// router.get('admin/subject/:id', student_controller.student_details);
// router.put('admin/subject/:id/update', student_controller.student_update);
// router.delete('admin/subject/:id/delete', student_controller.student_delete);



module.exports=router;