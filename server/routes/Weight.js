const express = require("express");
const router = express.Router();
const { weight_tracking, personal_info } = require("../models");

// get most recent weight for a user

router.get("/recent", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    //Find the field with the most recent weight for the user
    const recentWeightEntry = await weight_tracking.findOne({
      where: {
        user: userId,
      },
      order: [["id", "DESC"]],
    });
    // get the required data from the field
    const recentWeight = recentWeightEntry.weight;
    const BMI = recentWeightEntry.BMI;
    const RMR = recentWeightEntry.RMR;
    const date = recentWeightEntry.date;
    const age = recentWeightEntry.age;
    const id = recentWeightEntry.id;

    res.json({ userId, recentWeight, date, BMI, RMR, age, id });
  } catch (err) {
    console.error("Error while fetching recent weight:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update the age for the most recent weight entry of a user
// The record id came from the earlier client get request.
router.put("/", async (req, res) => {
  try {
    const { id, age } = req.body;

    // Find the weight entry with the specified primary key (id)
    const weightEntry = await weight_tracking.findByPk(id);

    if (!weightEntry) {
      return res.status(404).json({ message: "Weight entry not found." });
    }

    // Update the age for the specific weight entry
    await weightEntry.update({ age });
    res.status(200).json({ message: "Age updated successfully" });
  } catch (err) {
    console.error("Error while updating age:", err);
    res.status(500).send("Internal Server Error");
  }
});

//Get the users height and sex for calorie requirements.

router.get("/height", async (req, res) => {
  try {
    //get the user id from the header
    const userId = req.header("userId");
    //find this user
    const userInfo = await personal_info.findOne({
      where: { user: userId },
    });
    // get the required data from the field
    const height = userInfo.height;
    const sex = userInfo.sex;
    res.json({ height, sex });
  } catch (err) {
    console.error("Error while fetching height and sex", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
    try {
      const item = req.body;
      // Using Sequelize's "create" - insert item into the weight_tracking table
      await weight_tracking.create(item);
      res.json(item);
    } catch (err) {
      console.error("Error while creating weight entry:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
