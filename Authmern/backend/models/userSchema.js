const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not Valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 4,
  },
  tokens: [
    {
      token: {
        typeString,
        required: true,
      },
    },
  ],
});


// creating model

const userdb = new mongoose.model("users", userSchema)

module.exports = userdb