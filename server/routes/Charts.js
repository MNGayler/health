const express = require("express");
const router = express.Router();
const {
  water_tracking,
  weight_tracking,
  nutrient_tracking,
} = require("../models");

// get last 7 days of Water consumption for user

router.get("/water", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    console.log("userId:", userId);
    //fetch the last seven intakes
    const sevenIntakes = await water_tracking.findAll({
      where: {
        user: userId,
      },
      order: [["date", "DESC"]],
      limit: 7,
    });
    res.json(sevenIntakes);
  } catch (error) {
    console.error("Error while fetching water consumptions:", error);
    res.status(500).send("Internal Server Error");
  }
});

//  get last 7 days of Weight measurements for user

router.get("/weight", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    console.log("userId:", userId);
    //fetch the last seven intakes
    const sevenIntakes = await weight_tracking.findAll({
      where: {
        user: userId,
      },
      order: [["date", "DESC"]],
      limit: 7,
    });
    res.json(sevenIntakes);
  } catch (error) {
    console.error("Error while fetching weight measurements:", error);
    res.status(500).send("Internal Server Error");
  }
});

//  get last 7 days of nutrieent calculations for a user
// these rows include calore intake and all nutrients intakes

router.get("/nutrients", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    console.log("userId:", userId);

    sevenNutrientRows = await nutrient_tracking.findAll({
      where: {
        user: userId,
      },
      order: [["date", "DESC"]],
      limit: 7,
    });
    res.json(sevenNutrientRows);
  } catch (error) {
    console.error("Error while fetching nutrient info:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
