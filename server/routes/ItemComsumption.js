const express = require("express");
const router = express.Router();
const { intake_food_item } = require("../models");

// Add an item consumption

router.post("/", async (req, res) => {
  const item = req.body;
  //using sequelizes' "create" - post item into the intake_food_item table
  await intake_food_item.create(item);
  res.json(item);
});

// GET all the users consumptions

router.get("/", async (req, res) => {
  try {
    const userId = req.header("userId");
    const listOfConsumptions = await intake_food_item.findAll({
      where: {
        user: userId,
      },
    });
    res.json(listOfConsumptions);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
