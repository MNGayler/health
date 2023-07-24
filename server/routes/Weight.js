const express = require("express");
const router = express.Router();
const { weight_tracking } = require("../models");

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
      order: [["date", "DESC"]],
    });
    // get the required data from the field
    const recentWeight = recentWeightEntry.weight;
    const BMI = recentWeightEntry.BMI
    const RMR = recentWeightEntry.RMR
    const date = recentWeightEntry.date
    const age = recentWeightEntry.age
    


    res.json({ userId, recentWeight, date, BMI, RMR, age });
  } catch (err) {
    console.error("Error while fetching recent weight:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
