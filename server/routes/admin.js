const express = require('express');
const route = express.Router()

const subject= require('./admin/subjectr');
const semester= require('./admin/semester');
const branch= require('./admin/branch');

route.use('/subject',subject);
route.use('/semester',semester);
route.use('/branch',branch);

module.exports=route