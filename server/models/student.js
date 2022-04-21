const mongoose = require('mongoose');
require('dotenv').config();
const Schema = require('mongoose').Schema;

const jwt = require("jsonwebtoken");
const studentSchema = mongoose.Schema({
    name:{
        type:String,
        
    },
    
    email:{
        type:String,
       
       
    },
    password:{
        type:String,
       
    },

    rollno:{
        type:Number,
      

    },

    gender:{
        type:String,
       

    },

    phone:{
        type:Number,
       
    },
    sem:{
        type:String,
    },
    branch:{
        type:String,
    },
   tokens:[{
       token:{
           type:String
       }
   }]
    
    
//     sem: { type: Schema.Types.ObjectId, ref: "semester" },
//   branch: { type: Schema.Types.ObjectId, ref: "branch"}
})
studentSchema.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){
        console.log(error);
        res.send("the error part"+error);
    }
}


module.exports = mongoose.model('student',studentSchema)