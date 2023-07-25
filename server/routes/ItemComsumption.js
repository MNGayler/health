const express = require("express");
const router = express.Router();
const { global_item_intake,  user_item_intake } = require("../models");

// Add an item consumption

router.post("/globalitem", async (req, res) => {
  const item = req.body;
  //using sequelizes' "create" - post item into the intake_food_item table
  await global_item_intake.create(item);
  res.json(item);
});

router.post("/useritem", async (req, res) => {
  const item = req.body;
  //using sequelizes' "create" - post item into the intake_food_item table
  await user_item_intake.create(item);
  res.json(item);
});

// GET all the users consumptions

router.get("/", async (req, res) => {
  try {
    const userId = req.header("userId");

    // Find all records in Global_intake_item table for the user
    const globalIntakeItems = await global_item_intake.findAll({
      where: {
        user: userId,
      },
    });

    // Find all records in User_intake_item table for the user
    const userIntakeItems = await user_item_intake.findAll({
      where: {
        user: userId,
      },
    });

    // Add a new property "type" to each item object to indicate whether it is a global or user item
    const globalItems = globalIntakeItems.map(item => ({ ...item.toJSON(), type: "global" }));
    const userItems = userIntakeItems.map(item => ({ ...item.toJSON(), type: "user" }));

    // Combine the results from both tables into a single array
    const listOfConsumptions = [...globalItems, ...userItems];

    res.json(listOfConsumptions);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
