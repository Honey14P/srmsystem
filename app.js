require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();
var db = process.env.MONGO_URL
var port = process.env.PORT || 4001;
const student = require('./routes/studentr'); // Imports routes for the products
const mongoose = require('mongoose');
const connectDB = require('database/connection')
connectDB();
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/student', student);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});