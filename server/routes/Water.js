const express = require("express");
const router = express.Router();
const { water_tracking } = require("../models");

// get today's water consumption
router.get("/", async (req, res) => {
  try {
    // Get user from header
    const userId = req.header("userId");
    // Get todays date
    const currentDate = new Date().toISOString().split("T")[0]
    console.log("current date logged as: ", currentDate)

    // Get the water intake record for the user on the current date
    const todaysIntake  = await water_tracking.findOne({
      where: {
        user: userId,
        date: currentDate,
      },
      
    });

    // If there is no record for today, return 0 intake
    const todaysIntakeValue = todaysIntake ? todaysIntake.intake : 0;
    res.json({ todaysIntake: todaysIntakeValue });
  } catch (err) {
    console.error("Error while fetching today's water consumption:", err);
    res.status(500).send("Internal Server Error");
  }
});

//Post route for when there is no intake for today

router.post("/", async (req, res) => {
  try {
    const { user, intake } = req.body;
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in 'YYYY-MM-DD' format

    // Check if there is already a record for today
    const todaysIntake = await water_tracking.findOne({
      where: {
        user: user,
        date: currentDate,
      },
    });

    if (todaysIntake) {
      // If there is already a record, update the intake value
      const newTotal = todaysIntake.intake + intake;
      await todaysIntake.update({ intake: newTotal });
      res.json({ todaysIntake: newTotal });
    } else {
      // If no record found, create a new record for today
      const data = {
        user: user,
        date: currentDate,
        intake: intake,
      };
      const newIntake = await water_tracking.create(data);
      res.json({ todaysIntake: newIntake.intake });
    }
  } catch (err) {
    console.error("Error while creating/updating water consumption entry:", err);
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
