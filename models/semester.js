//Todo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
  name: { type: String, required: true  },
 
 
});

const semester = mongoose.model("semester", SemesterSchema);
module.exports = semester;
