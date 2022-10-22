const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const router = new express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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

    // console.log("userFindOk",userFind)

    //token generate for reset password

    const token = jwt.sign({ _id: userFind._id }, process.env.KEYSECRET, {
      expiresIn: "120s",
    });
    // console.log("RESET Token", token)

    const setUserToken = await userdb.findByIdAndUpdate(
      { _id: userFind._id },
      { verifytoken: token },
      { new: true }
    );

    // console.log("SetToken", setUserToken);

    if (setUserToken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "SEND EMAIL FOR PASSWORD FORGET",
        text: `This Link is valid for only 2 MINUTES http://localhost:3000/forgotpassword/${userFind.id}/${setUserToken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email Sent", info.response);
          res.status(201).json({ status: 201, message: "Email Send" });
        }
      });
    }
  } catch (err) {
    res.status(401).json({ status: 401, message: "Invalid User" });
  }
});

// ******** Verify user for forgot password ******

router.get("/forgotpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  try {
    const validUser = await userdb.findOne({ _d: id, verifytoken: token });
    // console.log("validUser", validUser);

    const verifyToken = jwt.verify(token, process.env.KEYSECRET);

    // console.log(verifyToken);
    if (validUser && verifyToken._id) {
      res.status(201).json({ status: 201, validUser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (err) {
    res.status(401).json({ status: 401, err });
  }
});

// ********* Change Password Api**********

router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const validUser = await userdb.findOne({ _id: id, verifytoken: token });
    const verifyToken = jwt.verify(token, process.env.KEYSECRET);

    if (validUser && verifyToken._id) {
      const newPassowrd = await bcrypt.hash(password, 10);
      const setNewUserPassword = await userdb.findByIdAndUpdate(
        { _id: id },
        { password: newPassowrd }
      );

      const setUserData = await setNewUserPassword.save();
      res.status(201).json({ status: 201, setUserData });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (err) {
    res.status(401).json({ status: 401, err });
  }
});

module.exports = router;
