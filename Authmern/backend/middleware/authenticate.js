const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keySecret = "rahulKumarisbestdeveloperintheworldawesome";

const authenticate = async (req,res,next) => {
  try {
    const token = req.headers.authorization;

    console.log(token)
    

    // const verifytoken = jwt.verify(token, keySecret);
    // console.log(verifytoken);
  } catch (err) {
    // console.log("error", err);
  }
};

module.exports = authenticate;
