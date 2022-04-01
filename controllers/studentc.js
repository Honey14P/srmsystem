const Student = require('../models/student');

//Simple version, without validation or sanitation

exports.student_create = function (req, res) {
    let student = new Student(
        {
            name: req.body.name,
            email: req.body.email,
            password:req.body.password
        }
    );

    student.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('student Created successfully')
    })
    
};