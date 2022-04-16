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
const router = require('./admin/studentr');



route.get('/', (req, res) => {
    
            res.render('Home');  
    
});
route.get('/signup', (req, res) => {
    
    res.render('signup');  

});
route.get('/login', (req, res) => {
    
    res.render('login');  

});


route.get('/admin', (req, res) => {
    
    res.render('adminhome', {
        errorMessage: "suceess",
      });  

});
route.get('/admin/addnewstudent', (req, res) => {
    
    res.render('addnewstudent');  

});
route.get('/admin/managestudent', (req, res)=>{

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
route.post("/signup",  (req, res) => {
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
           alert("success");
            res.render('studenthome');
            
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

});
  
route.get('/studenthome', (req, res) => {
    
    res.render('studenthome');  

});

route.get('/find', (req, res)=>{

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
                res.send(newUser)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
});

module.exports=route;