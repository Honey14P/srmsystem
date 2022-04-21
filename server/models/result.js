const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  
  rollno:{
    type:Number
    
},
  marks1: { 
    type: Number
  },
  marks2: { 
    type: Number
  },
  marks3: { 
    type: Number
  },
  marks4: { 
    type: Number
  },
  marks5: { 
    type: Number
  },
  
});

const result = mongoose.model("Result", ResultSchema);
module.exports = result;
