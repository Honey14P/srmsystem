require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
// initialize our express app
const app = express();
var db = process.env.MONGO_URL
var port = process.env.PORT || 4001;
const student = require('./routes/studentr'); 
const subject = require('./routes/subjectr');
const semester = require('./routes/semester');
const branch = require('./routes/branch');
const login=require('./routes/user');
const mongoose = require('mongoose');
const connectDB = require('./database/connection')

connectDB();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get("/", (req, res) => {
    res.status(200).send(`Hi Welcome to the Result`);
   
  });
app.use('/student', student);
app.use('/',login);
app.use('/subject',subject);
app.use('/semester',semester);
app.use('/branch',branch);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});