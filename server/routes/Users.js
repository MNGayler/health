const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");

//register a user into users table
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    users.create({
      username: username,
      email: email,
      password: hash,
      is_admin: false,
    });
    res.json("user added");
  });
});

module.exports = router;