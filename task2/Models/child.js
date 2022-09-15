const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ["PreKG", "KG1", "KG2"],
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  },
});

module.exports = mongoose.model("Child", schema);
