const express = require('express');
const jwt = require("jsonwebtoken");

const route = express.Router()

const cookieParser = require("cookie-parser");
const decodeCookie = require("jwt-decode");

route.use(cookieParser());


var User = require("../models/student");
var Result = require("../models/result");
var announcement = require("../models/announcement");
var subject = require(".././models/subject");

const { cookie } = require('express-validator');
const { application } = require('express');
const cons = require('consolidate');
const { default: mongoose } = require('mongoose');
const router = require('./admin');





route.get('/adminhome', (req, res) => {

    res.render('adminhome',{message:null});

});
route.get("/adminlogout", (req, res) => {
    res.clearCookie("srms");

    res.redirect("/");

});
route.get('/studenthome', (req, res) => {


    res.render('studenthome', { message: null });

});
route.get('/error', (req, res) => {


    res.render('error');

});
route.get('/addnewstudent', (req, res) => {
    res.render('addnewstudent');
});
route.get('/addannouncement', async (req, res) => {
    // const an =  await announcement.find({});
    // console.log("ans"+an);
    res.render('addannouncement', { message: null });


});
route.get('/announcement', async (req, res) => {

    const an = await announcement.find({});
    res.render('announcement', { an });


});

route.post('/addannouncement', (req, res) => {
    // const an =  await announcement.find({});
    // console.log("ans"+an);
    try {
        if (
            !req.body.email ||
            !req.body.password

        ) {
            return res.status(422).render('adminhome')
        }

        let newannouncement = new announcement({
            name: req.body.email,
            link: req.body.password,

        });

        newannouncement.save();
        res.status(200).render('addannouncement', { message: "Annoncement Added " });

    } catch (error) {
        res.status(400).render('Adminhome',{message:null});

    }




});
route.get('/addmarks/(:id)', async function (req, res) {

    const user3 = await User.findById(req.params.id);
    const sem = user3.sem;
    const branch = user3.branch;
    const useremail = await subject.findOne({ sem: sem });
    const user4 = Result.findById(req.params.id);
   
        res.render('addmarks', { user3, useremail });
    
});
route.post('/addmarks/(:id)', async (req, res) => {
    
    
    
    try {
        if (
            !req.body.rollno ||
            !req.body.sub1 ||
            !req.body.sub2 ||
            !req.body.sub3 ||
            !req.body.sub4 ||
            !req.body.sub5
        ) {
            return res.status(422).json({ err: "Please Enter in All the required field" });
        }
        console.log(req.body);
        let newResult = new Result({
            rollno: req.body.rollno,
            marks1: req.body.sub1,
            marks2: req.body.sub2,
            marks3: req.body.sub3,
            marks4: req.body.sub4,
            marks5: req.body.sub5
        });


        await newResult.save();
        res.status(200).render('adminhome',{message:null});



    } catch (error) {
        res.status(400).render('adminhome',{message:null});
    }


});


route.post('/addnewstudent', (req, res) => {
    try {
        
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            rollno: req.body.rollno,
            gender: req.body.gender,
            phone: req.body.phone,
            branch: req.body.branch,
            password: req.body.password,
            sem: req.body.sem
        });

        newUser.save();
        res.status(200).render('adminhome',{message:null});

    } catch (error) {
        res.status(400);
        res.render('error');
    }

});

route.get('/deletestudent/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/managestudent');
        } else {
            res.redirect('/student/adminhome');
        }
    });
});
route.get('/deleteannouncement/:id', function (req, res, next) {
    announcement.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/manageannouncement');
        } else {
            res.redirect('/student/adminhome');
        }
    });
});
route.get('/managestudent', async (req, res) => {
    const user = await User.find({});
    res.render('managestudent', { user });


});
route.get('/manageannouncement', async (req, res) => {
    const announce = await announcement.find({});
    res.render('manageannouncement', { announce });


});
route.get('/studentprofile', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded = decodeCookie(req.cookies.srms);

    const user = await User.findById(decoded._id);
    res.render('studentprofile', { user: user, message: null });


});
route.post('/studentprofile', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded = decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    const user3 = await User.findById(decoded._id);
    User.findByIdAndUpdate(decoded._id, { $set: req.body }, function () {

        res.status(200);
        res.render('studenthome', { message: "Profile Updated" });


    });


});




route.get('/updateannouncement/:id', async function (req, res) {
    const announce = await announcement.findById(req.params.id);
    res.render('updateannouncement', { announce });
});

route.post('/updateannouncement/(:id)', function (req, res) {
    announcement.findByIdAndUpdate(req.params.id, { $set: req.body.email }, function () {

        res.redirect('/student/manageannouncement');
    });
});



route.get('/updateprofile/(:id)', async function (req, res) {
    const user3 = await User.findById(req.params.id);
    res.render('updateprofile', { user3 });
})
route.post('/updateprofile/(:id)', function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function () {

        res.redirect('/student/managestudent');
    });
})


route.get('/viewmarks', async (req, res) => {
    var decoded = decodeCookie(req.cookies.srms);
    //console.log(decoded._id);
    const user = await User.findById(decoded._id);
    const roll = user.rollno;
    const sem = user.sem;
    const sub = await subject.findOne({ sem: sem });
    const userroll = await Result.findOne({ rollno: roll });
    if (!userroll) {
        res.render('resultnotadded');
    }
    else {
        res.render('viewmarks', { userroll, user, sub });
    }



});













route.get('/home', (req, res) => {

    res.render('home');

});
route.get('/resultnotadded', (req, res) => {

    res.render('resultnotadded');

});








route.get("/logout", (req, res) => {
    res.clearCookie("srms");

    res.redirect("/");

});

// route.post('/signup', (req, res) => {
//     try{
//     if (
//         !req.body.name ||   
//         !req.body.email ||
//         !req.body.rollno ||
//         !req.body.gender ||
//         !req.body.phone ||
//         !req.body.branch ||
//         !req.body.password ||
//         !req.body.sem
//       ) {
//         return res.status(422).render({ err: "Please Enter in All the required field" });
//       }
//     console.log(req.body);
//         let newUser = new User({
//             name: req.body.name,
//             email: req.body.email,
//             rollno: req.body.rollno,
//             gender:req.body.gender,
//             phone:req.body.phone,
//             branch:req.body.branch,
//             password:req.body.password,
//             sem:req.body.sem
//         });




//         newUser.save();
//         res.status(200).render('login',{message:null});

//     }catch(error){
//         res.status(404).render("error");
//     }

// })



module.exports = route;