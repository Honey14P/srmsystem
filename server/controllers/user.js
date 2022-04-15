const express=require('express');

//const app=express()=> this wil create another express application
//Allows to create diff router in seperate file
const route=express.Router();


//route.get('/menu',services.menuRoutes);
//route.get('/contactus',services.contactusRoutes);
//route.get('/gallery',services.galleryRoutes);
//route.get('/feedback',services.feedbackRoutes);

module.exports=route;

//route.get('/',(req,res)=>
//{
  //STATIC VALUE
  //res.send("HELLO");

  //EJS FILE
  //res.render('index1');

  //HTML FILE
  //res.sendFile(path.join(__dirname+'/index1.html'));
//})
/*
route.get('/menu',(req,res)=>
{
  res.render('menu');
})

route.get('/contactus',(req,res)=>
{
  res.render('contactus');
})

route.get('/gallery',(req,res)=>
{
  res.render('gallery');
})

route.get('/feedback',(req,res)=>
{
  res.render('feedback');
})
*/