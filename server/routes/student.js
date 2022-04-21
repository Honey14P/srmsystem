const express = require('express');
const jwt=require("jsonwebtoken");
const route = express.Router()

var passport = require("passport");
const cookieParser = require("cookie-parser");
const decodeCookie = require("jwt-decode");
var LocalStrategy = require("passport-local");
var localStorage=require("node-localstorage").LocalStorage;
route.use(cookieParser()); 

route.use(require("express-session")({
    secret: "node js mongodb",
    resave: false,
    saveUninitialized: false
    }));
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require("bcrypt");


var User = require("../models/student");
const { RESOURCES_INITIALIZE } = require('admin-bro');
const { cookie } = require('express-validator');
const { application } = require('express');
const cons = require('consolidate');
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


route.get('/login', (req, res) => {
    
    res.render('login');  

});
route.get('/announcement', (req, res) => {
    
    res.render('announcement');  

});
route.get('/adminhome', (req, res) => {
    
    res.render('adminhome');  

});
route.get('/studenthome', (req, res) => {
    
    
    res.render('studenthome');  
    
});
route.get('/studentprofile', (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded =decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    res.render('studentprofile',{decoded});


});
route.get('/signup', (req, res) => {
    
    res.render('signup');  

});

route.get('/managestudent', (req, res) => {
    
    res.render('managestudent');  

});
route.get('/home', (req, res) => {
    
    res.render('home');  

});





route.post('/login', async(req, res) => {
    try{
        const email=req.body.email;
        const password=req.body.password;
        const useremail = await User.findOne({email:email});
        
        //console.log(`${email} ${password}`)
        if(useremail.password===password){
            const token = await useremail.generateAuthToken();
            res.cookie("srms",token,{
            expires:new Date(Date.now()+1800000),
           // httpOnly:true
        });
        
            res.status(201).render("studenthome");
        }else{
            res.send("Check Credentials");
        }
       //res.send(useremail);
        //console.log(useremail);

    }catch(error){
        res.status(400).send("Invalid");
    }

});




route.post('/signup', async(req, res) => {
    try{
    if (
        !req.body.name ||
        !req.body.fname ||
        !req.body.email ||
        !req.body.rollno ||
        !req.body.gender ||
        !req.body.phone ||
        !req.body.branch ||
        !req.body.password ||
        !req.body.sem
      ) {
        return res.status(422).json({ err: "Please Enter in All the required field" });
      }
    console.log(req.body);
        let newUser = new User({
            name: req.body.name,
            fname: req.body.fname,
            email: req.body.email,
            rollno: req.body.rollno,
            gender:req.body.gender,
            phone:req.body.phone,
            branch:req.body.branch,
            password:req.body.password,
            sem:req.body.sem
        })
       
        //   try {
        //     const userExist = await User.findOne({ email:email });
        
        //     if (userExist) {
        //       console.log(userExist.email);
        //       return res.status(400).json({ error: "user already exist" });
        //     }
       
         console.log(newUser);
        //  const token = await newUser.generateAuthToken();
        //  res.cookie("jwt",token,{
        //      expires:new Date(Date.now()+1800000),
        //      httpOnly:true
        //  });
        //  console.log(cookie);
        let registered = await newUser.save();
        res.status(201).render("login");

    }catch(error){
        res.status(400).send("Invalid");
    }
    
})



module.exports=route;