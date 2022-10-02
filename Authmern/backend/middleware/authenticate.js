const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");


const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // console.log(token);

    //*****verify always key aur token hoga*******

    const verifytoken = jwt.verify(token, process.env.KEYSECRET);

    //console.log(verifytoken);

    const rootUser = await userdb.findOne({ _id: verifytoken._id });

    // console.log("rootUser", rootUser);

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (err) {
    res.status(401).json({status:401,message:"Unauthorized No Token Provide"})
  }
};

module.exports = authenticate;
