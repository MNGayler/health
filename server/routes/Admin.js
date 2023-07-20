const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//REGISTER an admin into users table
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    users.create({
      username: username,
      email: email,
      password: hash,
      is_admin: true,
    });
    res.json("Admin added");
  });
});

//LOGIN an admin

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ where: { email: email } });
  //check if user(by email) exists - if not return an error
  if (!user) return res.json({ error: "Wrong email or password!" });
  // Check if user has an admin account - is_admin is true for admin accounts
  if (!user.is_admin) {
    return res.json({ error: "Wrong account type. Users cannot log in here." });
  }
  //compare the from password(hashed) to the stored hash
  bcrypt.compare(password, user.password).then((match) => {
    //if passwords don't match - error
    if (!match) return res.json({ error: "Wrong email or password!" });
    //We have a match - login Admin
    const accessToken = sign({email: user.email, id: user.user_id, is_admin: user.is_admin}, "accesstokensecret")
    res.json(accessToken);
    
  });
});

module.exports = router;
