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

exports.student_details = function (req, res) {
    Student.findById(req.params.id, function (err, student) {
        if (err) return next(err);
        res.send(student);
    })
};

exports.student_update = function (req, res) {
    Student.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, student) {
        if (err) return next(err);
        res.send('Student udpated.');
    });
};

exports.student_delete = function (req, res) {
    Student.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};