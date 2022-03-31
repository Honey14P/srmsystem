const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();
let port = 4001;
const student = require('./routes/studentr'); // Imports routes for the products
const mongoose = require('mongoose');
let dburl = 'mongodb+srv://Honey096:gubrGr0ZV6PqcqN1@cluster0.pcthb.mongodb.net/srms?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dburl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/student', student);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});