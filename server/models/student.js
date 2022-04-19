const mongoose = require('mongoose');
require('dotenv').config();
const Schema = require('mongoose').Schema;
const passportLocalMongoose = require("passport-local-mongoose");
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
            type:String,
            required:true
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
        res.send("the error part"+error);
    }
}

studentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('student',studentSchema)