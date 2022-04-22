const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announceSchema = new Schema({
  name: { type: String, },
  link: { type: String, }
  
 
});

const announcement = mongoose.model("announcement", announceSchema );
module.exports = announcement;