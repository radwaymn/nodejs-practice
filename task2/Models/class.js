const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  supervisor: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  children: [{ type: Number, ref: "Child" }],
});

module.exports = mongoose.model("Class", schema);
