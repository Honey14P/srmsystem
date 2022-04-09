//Todo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  name: { type: String, required: true  },
  branch_details: { type: String, required: true },
 
});

const branch = mongoose.model("branch", BranchSchema);
module.exports = branch;
