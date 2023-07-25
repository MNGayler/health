const express = require("express");
const router = express.Router();
const { nutrient_tracking } = require("../models");

//Find a record for given user on given date
router.get("/", async (req, res) => {
  try {
    const headerId = req.header("userId");
    const headerDate = req.header("date");

    const nutrientRow = await nutrient_tracking.findOne({
      where: {
        user: headerId,
        date: headerDate,
      },
    });
    res.json(nutrientRow);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// add new entry
router.post("/", async (req, res) => {
    try {
      const nutrition = req.body;
      // Using Sequelize's "create" - insert new nutrient_tracking record
      const createdNutrition = await nutrient_tracking.create(nutrition);
      res.json(createdNutrition);
    } catch (error) {
      console.error("Error adding new entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// update an entry using the pk from the previous GET request

router.put("/", async (req, res) => {
  primaryKey = req.body.id;
  nutritionData = req.body;
  try {
    // Find the item by ID
    const item = await nutrient_tracking.findByPk(primaryKey);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the item with the new data
    await item.update(nutritionData);
    res.json({ message: "Nutrition updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
