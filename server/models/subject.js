//Todo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: { type: String, required: true  },
  sem: { type: Schema.Types.ObjectId, ref: "semester" },
  branch: { type: Schema.Types.ObjectId, ref: "branch" }
 
});

const subject = mongoose.model("subject", SubjectSchema);
module.exports = subject;
