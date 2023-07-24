const express = require("express");
const router = express.Router();
const { water_tracking } = require("../models");

// get today's water consumption
router.get("/", async (req, res) => {
  try {
    // Get user from header
    const userId = req.header("userId");

    // Get the most recent intake for the user
    const mostRecentIntake = await water_tracking.findOne({
      where: {
        user: userId,
      },
      // Sort by date in descending order so we get the most recent
      order: [["date", "DESC"]],
    });

    // Get required data from the field
    const todaysIntake = mostRecentIntake ? mostRecentIntake.intake : 0;
    res.json({ todaysIntake });
  } catch (err) {
    console.error("Error while fetching recent weight:", err);
    res.status(500).send("Internal Server Error");
  }
});

//Post route for when there is no intake for today

router.post("/", async (req, res) => {
  try {
    const item = req.body;
    await water_tracking.create(item);
    res.json(item);
  } catch (err) {
    console.error("Error while creating water consumption entry:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT route to add consumption to today's intake
router.put("/", async (req, res) => {
    try {
      const { userId, intake } = req.body;
  
      // Find today's entry
      const todaysEntry = await water_tracking.findOne({
        where: {
          user: userId,
        },
        // Sort by date in descending order so we get the most recent
        order: [["date", "DESC"]],
      });
  
      if (!todaysEntry) {
        return res.status(404).json({ message: "Water entry not found." });
      }
  
      const newTotal = todaysEntry.intake + intake;
  
      // Update the intake for the specific water entry
      await todaysEntry.update({ intake: newTotal });
  
      res.status(200).json({ message: "Water updated successfully" });
    } catch (err) {
      console.error("Error while updating water:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
