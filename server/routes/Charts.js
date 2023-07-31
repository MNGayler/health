const express = require("express");
const router = express.Router();
const { water_tracking } = require("../models");

// get last 7 Water inputs for user

router.get("/water", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    console.log("userId:", userId);
    //fetch the last seven intakes
    const sevenIntakes = await water_tracking.findAll({
        where: {
          user: userId},
          order: [["date", "DESC"]],
          limit: 7,
        
      })
      res.json(sevenIntakes);
  } catch (error) {
    console.error("Error while fetching water consumptions:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
