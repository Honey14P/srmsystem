require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const morgan = require('morgan');
// initialize our express app
const app = express();
var db = process.env.MONGO_URL
var port = process.env.PORT || 4001;
const home= require('./server/routes/home');
//const student= require('./server/routes/student');
//const admin= require('./server/routes/admin');

const mongoose = require('mongoose');
const connectDB = require('./server/database/connection')


connectDB();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan('tiny'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/css', express.static(path.resolve(__dirname, "public/css")))
app.use('/img', express.static(path.resolve(__dirname, "public/img")))
app.use('/js', express.static(path.resolve(__dirname, "public/js")))

//app.use('/admin', admin);
//app.use('/student',student);

app.use('/',home);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});