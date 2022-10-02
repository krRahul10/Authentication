const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const router = new express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")

// **** email config ****

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//******* register REST API *********

router.post("/register", async (req, res) => {
  // console.log(req.body)
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await userdb.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password is not match" });
    } else {
      const finalUser = new userdb({
        fname,
        email,
        password,
        cpassword,
      });

      //here is password hashing work start

      const storeData = await finalUser.save();
      //   console.log(storeData)
      res.status(201).json({ status: 201, storeData });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Catch block error");
  }
});

// ************ login REST API **********

router.post("/login", async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const userValid = await userdb.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(422).json({ error: "Invalid Details" });
      } else {
        const token = await userValid.generateAuthToken();

        console.log(token);

        //cookie generate here  after token

        res.cookie("userCookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

//********** user validate check  ********

router.get("/validuser", authenticate, async (req, res) => {
  // console.log("done")
  try {
    const validUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, validUserOne });
  } catch (err) {
    res.status(401).json({ status: 401, err });
  }
});

//************* USER LOGOUT CHECK **********

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currelem) => {
      return currelem.token !== req.token;
    });
    res.clearCookie("userCookie", { path: "/" });
    req.rootUser.save();
    res.status(201).json({ status: 201 });
  } catch (err) {
    res.status(401).json({ status: 401, err });
  }
});

// **********SEND EMAIL LINK FOR PASSWORD RESET *********

router.post("/sendpasswordlink", async (req, res) => {
  // console.log(req.body)
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email " });
  }
  try {
    const userFind = await userdb.findOne({ email: email });

    console.log("userFindOk",userFind)
  } catch (err) {
    // res.status(401).json({});
  }
});
module.exports = router;
