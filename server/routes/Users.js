const express = require("express");
const router = express.Router();
const { users, personal_info, weight_tracking } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//Register a user
/**
 * @api {post} /auth Register a user
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam {String} username User's username
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 * @apiParam {Number} height User's height
 * @apiParam {String} sex User's sex 
 * @apiParam {Number} weight User's weight
 * @apiParam {Number} age User's age
 *
 * @apiSuccess {Boolean} success Indicates whether the registration was successful
 * @apiSuccess {Number} user_id User ID of the registered user
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "user_id": 12
 * }
 *
 * @apiErrorExample {json} Error Response
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "success": false,
 *   "error": "Failed to register user."
 * }
 *
 * @apiDescription This endpoint registers a new user in the system.
 * The registration process involves creating a new user entry in the 'users' table,
 * as well as related entries in the 'personal_info' and 'weight_tracking' tables.
 * The provided user information includes username, email, password, height, sex, weight, and age.
 */
router.post("/", async (req, res) => {
  const { username, email, password, height, sex, weight, age } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    // Create a new user instance using build()
    const newUser = users.build({
      username: username,
      email: email,
      password: hash,
      is_admin: false,
    });

    // Save the new user instance to the database
    await newUser.save();
    //get the auto incremented id for the following database inserts
    const user_id = newUser.user_id;

    // switch "male" to true and "female" to false
    const sexBool = sex === "male";

    // ... (Inserting personal_info and weight_tracking)
    await personal_info.create({
      user: user_id,
      height: height,
      sex: sexBool,
    });

    const calcBMI = weight / (height * height);

    // basal metabolic rate
    const calculateRMR = () => {
      //user is male
      if (sex)
        return 88.362 + 13.397 * weight + 4.799 * height * 100 - 5.677 * age;
      // female
      return 447.593 + 9.247 * weight + 3.098 * height * 100 - 4.33 * age;
    };

    const calcRMR = calculateRMR();

    await weight_tracking.create({
      user: user_id,
      date: new Date(),
      weight: weight,
      BMI: calcBMI,
      RMR: calcRMR,
      age: age,
    });

    res.json({ success: true, user_id: user_id });
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ success: false, error: "Failed to register user." });
  }
});

//LOGIN a user
/**
 * @api {post} /auth/login Login a user
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {String} accessToken Access token for the authenticated user
 */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ where: { email: email } });
  //check if user(by email) exists - if not return an error
  if (!user) return res.json({ error: "Wrong email or password!" });
  // Check if user has a user account - is_admin is false for user accounts
  if (user.is_admin) {
    return res.json({
      error: "Wrong account type. Admins cannot log in here.",
    });
  }
  //compare the from password(hashed) to the stored hash
  bcrypt.compare(password, user.password).then((match) => {
    //if passwords don't match - error
    if (!match) return res.json({ error: "Wrong email or password!" });
    //We have a match - login user
    const accessToken = sign(
      { email: user.email, id: user.user_id, is_admin: user.is_admin },
      "accesstokensecret"
    );
    res.json(accessToken);
  });
});


/**
 * @api {get} /auth/name Get user's username
 * @apiName GetUsernameForNavbar
 * @apiGroup User
 *
 * @apiHeader {String} userId User's ID in the request header
 *
 * @apiSuccess {String} User's username for navbar 
 */
router.get("/name", async (req, res) => {
  // Get user from header
  const userId = req.header("userId");
  try {
    const navUsername = await users.findOne({ where: { user_id: userId } });
    //check if user exists - if not return an error
    if (!navUsername) return res.json({ error: "user not found" });
    //return username
    res.json({username: navUsername.username});
  } catch (error) {
    console.error("Error getting username:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
