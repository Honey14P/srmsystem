const Semester = require('../models/semester');



exports.semester_create = function (req, res) {
    let semester = new Semester(
        {
            name: req.body.name,
         
        }
    );

    semester.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('semester added successfully')
    })
    
};

exports.semester_details = function (req, res) {
    Semester.findById(req.params.id, function (err, semester) {
        if (err) return next(err);
        res.send(semester);
    })
};

exports.semester_update = function (req, res) {
    Semester.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, semester) {
        if (err) return next(err);
        res.send('Semester udpated.');
    });
};

exports.semester_delete = function (req, res) {
    Semester.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Semester Deleted successfully!');
    })
};