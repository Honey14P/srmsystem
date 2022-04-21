const express = require('express');
const jwt=require("jsonwebtoken");
const route = express.Router()

var passport = require("passport");
const cookieParser = require("cookie-parser");
const decodeCookie = require("jwt-decode");
var LocalStrategy = require("passport-local");

route.use(cookieParser()); 


var bcrypt = require("bcrypt");


var User = require("../models/student");

const { cookie } = require('express-validator');
const { application } = require('express');
const cons = require('consolidate');
const { default: mongoose } = require('mongoose');

route.use(passport.initialize());
route.use(passport.session());


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
route.get('/studentprofile', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded =decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    const user = await User.findById(decoded._id);
    res.render('studentprofile',{user});


});
route.get('/managestudent', async (req, res) => {


    
    //console.log(decoded._id);
    const user =  await User.find({});
    res.render('managestudent',{user});


});
route.get('/deletestudent', async (req, res) => {


    
    //console.log(decoded._id);
    const user =  await User.find({});
    res.render('deletestudent',{user});


});

route.post('/deletestudent', (req, res) => {
    const id=req.body.value;
    
    User.findByIdAndRemove(id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
});



route.get('/signup', (req, res) => {
    
    res.render('signup');  

});


route.get('/home', (req, res) => {
    
    res.render('home');  

});





route.post('/login', async(req, res) => {
    try{
        const email=req.body.email;
        const password=req.body.password;
        const useremail = await User.findOne({email:email});

        if(email==="admin" && password==="admin")
        {
            res.render('adminhome');
        }
        else{
        //console.log(`${email} ${password}`)
        if(useremail.password===password){
            const token = await useremail.generateAuthToken();
            res.cookie("srms",token,{
            expires:new Date(Date.now()+1800000),
           // httpOnly:true
        });
        
            res.status(200).render("studenthome");
        }else{
            res.send("Check Credentials");
        }
    }
       //res.send(useremail);
        //console.log(useremail);

    }catch(error){
        res.status(400).send("Invalid");
    }

});




route.post('/signup', (req, res) => {
    try{
    if (
        !req.body.name ||   
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
            email: req.body.email,
            rollno: req.body.rollno,
            gender:req.body.gender,
            phone:req.body.phone,
            branch:req.body.branch,
            password:req.body.password,
            sem:req.body.sem
        });
       
        
       
        
        newUser.save();
        res.status(200).render("login");

    }catch(error){
        res.status(400).send("Invalid");
    }
    
})



module.exports=route;