const express = require('express');


//var passport = require("passport");
//var bcrypt = require("bcrypt");
//const jsonwt = require("jsonwebtoken");
const route = express.Router()
var User = require("../models/student");



route.get('/', (req, res) => {
    
            res.render('Home');  
    
});
route.get('/login', (req, res) => {
    
    res.render('login');  

});
route.get('/signup', (req, res) => {
    
    res.render('signup');  

});

route.post("/signup",  (req, res) => {
    var newUser = new User({
      name: req.body.name,
      fname: req.body.fname,
      email: req.body.email,
      password: req.body.password,
      gender:req.body.gender,
      phone:req.body.phone,
      branch:req.body.branch,
      sem:req.body.sem
    });
  
    newUser
    .save(newUser)
    .then(data=>
        {
            //res.send(data)
            
            res.redirect('studenthome');
        })
        .catch(err=>
            {
                res.status(500).send({
                    message:err.message || "Error occurred"
                });
            });
    
  });
  
  route.get('/studenthome', (req, res) => {
    
    res.render('studenthome');  

});

module.exports=route;