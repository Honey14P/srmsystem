//Todo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  sub1: { type: String,   },
  sub2: { type: String,   },
  sub3: { type: String,   },
  sub4: { type: String,   },
  sub5: { type: String,  },
  sem: { type: String,  },
  branch: { type: String,   }

  
 
});

const subject = mongoose.model("subject", SubjectSchema);
module.exports = subject;
