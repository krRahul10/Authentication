const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
// const cookie = require("cookie-parser");
const router = new express.Router();

//*******register REST API*********

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

// ************login REST API **********

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

module.exports = router;
