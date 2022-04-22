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
var Result =require("../models/result");
var announcement=require("../models/announcement");

const { cookie } = require('express-validator');
const { application } = require('express');
const cons = require('consolidate');
const { default: mongoose } = require('mongoose');
const router = require('./admin');

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
route.get('/addnewstudent',(req, res) =>
{
  res.render('addnewstudent')
});
route.get('/managestudent', async (req, res) => {  
    const user =  await User.find({});
    res.render('managestudent',{user});


});
route.get('/addannouncement', async (req, res) => {  
    // const an =  await announcement.find({});
    // console.log("ans"+an);
    res.render('addannouncement');


});
route.get('/announcement',  (req, res) => {  
    const an =  announcement.find({});
    console.log("ans"+an);
    res.render('announcement');


});

route.post('/addannouncement', (req, res) => {  
    // const an =  await announcement.find({});
    // console.log("ans"+an);
    try{
        if (
            !req.body.email ||   
            !req.body.password
           
          ) {
            return res.status(422).json({ err: "Please Enter in All the required field" });
          }
        
            let newannouncement = new announcement({
                name: req.body.email,
                link: req.body.password,
                
            });
           
            
           
            
            newannouncement.save();
            res.status(200).render('addannouncement');
    
        }catch(error){
            res.status(400).send("Invalid");
        }
        
    


});
route.get('/deletestudent/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin/adminhome');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
});

route.get('/updateprofile/(:id)',  async function(req, res) {
    const user3 = await User.findById(req.params.id);
    res.render('updateprofile',{user3});
})
route.post('/updateprofile/(:id)',  function(req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function () {

        res.render('adminhome');
    });
})

route.post('/addnewstudent',(req, res) =>
{
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
          ) 
            
                res.json({
                  status:404,
                  message:"Your feedback successfully saved."
                });
        
            
          
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
            res.status(200).render("adminhome");
    
        }catch(error){
            res.status(400).send("Invalid");
        }
    
});


route.get('/viewmarks', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded =decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    const user = await User.findById(decoded._id);
    const roll=user.rollno;
    const userroll = await Result.findOne({rollno:roll});
    res.render('viewmarks',{userroll,user});



});

route.get('/addmarks', (req, res) => {


    
    //console.log(decoded._id);
    
    res.render('addmarks');


});
route.post('/addmarks', (req, res) => {


    try{
        if (
            !req.body.rollno ||   
            !req.body.subject1 ||
            !req.body.subject2 ||
            !req.body.subject3 ||
            !req.body.subject4 ||
            !req.body.subject5 
          ) {
            return res.status(422).json({ err: "Please Enter in All the required field" });
          }
        console.log(req.body);
            let newResult = new Result({
                rollno: req.body.rollno,
                marks1: req.body.subject1,
                marks2: req.body.subject2,
                marks3:req.body.subject3,
                marks4:req.body.subject4,
                marks5:req.body.subject5
            });
           
            
           
            
            newResult.save();
            res.status(200).render("adminhome");
    
        }catch(error){
            res.status(400).send("Invalid");
        }
        
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

        if(email==="admin123@gmail.com" && password==="admin")
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


route.get("/logout", (req, res) => {
    
      res.redirect("/student/login");

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