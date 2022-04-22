const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announceSchema = new Schema({
  name: { type: String, },
  link: { type: String, },
  
 
});

const announce = mongoose.model("announcement", announceSchema );
module.exports = announce;