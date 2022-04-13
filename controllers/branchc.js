const Branch = require('../models/branch');



exports.branch_create = function (req, res) {
    let branch = new Branch(
        {
            name: req.body.name,
            branch_details:req.body.branch_details
        }
    );

    branch.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('branch added successfully')
    })
    
};

exports.branch_details = function (req, res) {
    Branch.findById(req.params.id, function (err, branch) {
        if (err) return next(err);
        res.send(branch);
    })
};

exports.branch_update = function (req, res) {
    Branch.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, branch) {
        if (err) return next(err);
        res.send('Branch udpated.');
    });
};

exports.branch_delete = function (req, res) {
    Branch.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Branch Deleted successfully!');
    })
};