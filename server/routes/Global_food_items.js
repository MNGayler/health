const express = require("express");
const router = express.Router();
const { global_food_item } = require("../models");

router.get("/", async (req, res) => {
   const listOfGlobalItems = await global_food_item.findAll();
   res.json(listOfGlobalItems)

});

router.post("/", async (req, res) => {
  const globalItem = req.body;
  //using sequelizes' "create" - post globalItem into the global_food_item table
  await global_food_item.create(globalItem);
  res.json(globalItem);
});

module.exports = router;
 