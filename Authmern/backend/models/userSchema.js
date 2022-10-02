const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  verifytoken: {
    type: String,
  },
});

// password hashing before save by pre method of mongoDB

userSchema.pre("save", async function (next) {
  //this isModified bcoz jab password change tab hi

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
  }

  next();
});

// token generate here before model

userSchema.methods.generateAuthToken = async function () {
  try {
    let token23 = jwt.sign({ _id: this._id }, process.env.KEYSECRET, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23;
  } catch (error) {
    res.status(422).json(error);
  }
};

// creating model

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
