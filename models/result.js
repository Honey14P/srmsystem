const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  
  student: { type: Schema.Types.ObjectId, ref: "student" },
  subject: { type: Schema.Types.ObjectId, ref: "subject" },
  marks: { type: Number, required: true }
});

const result = mongoose.model("Result", ResultSchema);
module.exports = result;
