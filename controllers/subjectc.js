const Subject = require('../models/subject');



exports.subject_create = function (req, res) {
    let subject = new Subject(
        {
            name: req.body.name,
            sem: req.body.sem,
            branch:req.body.branch
        }
    );

    subject.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('subject added successfully')
    })
    
};

exports.subject_details = function (req, res) {
    Subject.findById(req.params.id, function (err, subject) {
        if (err) return next(err);
        res.send(subject);
    })
};

exports.subject_update = function (req, res) {
    Subject.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, subject) {
        if (err) return next(err);
        res.send('Subject udpated.');
    });
};

exports.subject_delete = function (req, res) {
    Subject.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Subject Deleted successfully!');
    })
};