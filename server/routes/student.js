const express = require('express');

const route = express.Router()


var passport = require("passport");
const csrf = require("csurf");


var LocalStrategy = require("passport-local");


const csrfProtection = csrf();
route.use(csrfProtection);
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
route.post("/signup", (req, res) => {
    const newUser = {
        name: req.body.name,
        fname: req.body.fname,
        email: req.body.email,
        rollno: req.body.rollno,
        gender:req.body.gender,
        phone:req.body.phone,
        branch:req.body.branch,
        password:req.body.password,
        sem:req.body.sem
    };
    // Check for user existance
    User.findOne({ email: newUser.email })
      .then((user) => {
        if (user) {
          req.flash("error", "This email is already exist");
          return res.redirect('student/signup');
        }
  
        // Store hash in your password.
        bcrypt.hash(newUser.password, 10, function (err, hash) {
          newUser.password = hash;
          // Save user details to the database
          new User(newUser)
            .save()
            .then((result) => {
              // res.json({ message: 'User is successfully register' });
              
              req.session.isLoggedIn = true;
              req.session.user = {
                id: result.id,
                email: result.email,
                name: result.name,
              };
              res.render('/student/login')
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  });  



module.exports=route;