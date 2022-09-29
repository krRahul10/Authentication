const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
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
        type: String,
        required: true,
      },
    },
  ],
});

// password hashing before save by pre method of mongoDB

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
  
    next();
  });

// creating model

const userdb = new mongoose.model("users", userSchema);



module.exports = userdb;
