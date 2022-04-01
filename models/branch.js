const mongoose = require('mongoose');

const DbSchema = mongoose.Schema({
    
    
    name:{
        type:String,
        required: true
    }
    
    
})

module.exports = mongoose.model('branch',DbSchema)