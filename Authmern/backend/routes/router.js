const express = require("express");
const userdb = require("../models/userSchema");
const router = new express.Router();

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
        cpassword
      });

      //here is password hashing work start

      const storeData = await finalUser.save()
    //   console.log(storeData)
    res.status(201).json(storeData)

    }
  } catch (err) {
    res.status(500).json(err)
    console.log("Catch block error");
  }
});

module.exports = router;


