const express = require('express');

const route = express.Router()


var passport = require("passport");

var LocalStrategy = require("passport-local");
route.use(require("express-session")({
    secret: "node js mongodb",
    resave: false,
    saveUninitialized: false
    }));
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require("bcrypt");


var User = require("../models/student");
route.use(require("express-session")({
secret: "node js mongodb",
resave: false,
saveUninitialized: false
}));
route.use(passport.initialize());
route.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

route.get('/signup', (req, res) => {
    
    res.render('signup');  

});
route.get('/login', (req, res) => {
    
    res.render('login');  

});
route.get('/studenthome', (req, res) => {
    
    res.render('studenthome');  

});
route.post('/signup',  (req, res) => {
    const newUser=new User({ name: req.body.name,
        fname: req.body.fname,
        email: req.body.email,
        rollno: req.body.rollno,
        gender:req.body.gender,
        phone:req.body.phone,
        branch:req.body.branch,
        password:req.body.password,
        sem:req.body.sem})
        newUser
        .save(newUser)
        .then(data => {
            //res.send(data)
           
            res.render('studenthome');
            
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

});

module.exports=route;