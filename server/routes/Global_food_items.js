const express = require("express");
const router = express.Router();
const { global_food_item } = require("../models");

router.get("/", (req, res) => {
  res.json("Global food item page");
});

router.post("/"),
  async (req, res) => {
    const globalItem = req.body;
    //using sequelizes' "create" - post globalItem into the global_food_item table
    await global_food_item.create(globalItem);
    res.json(globalItem);
  };

module.exports = router;
