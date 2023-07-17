const express = require("express");
const router = express.Router();
const { global_food_item } = require("../models");
//get all
router.get("/", async (req, res) => {
  const listOfGlobalItems = await global_food_item.findAll();
  res.json(listOfGlobalItems);
});

//get individual using primary key, id.
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const item = await global_food_item.findByPk(id);
  res.json(item)

});

router.post("/", async (req, res) => {
  const globalItem = req.body;

  //using sequelizes' "create" - post globalItem into the global_food_item table
  await global_food_item.create(globalItem);
  res.json(globalItem);
});

module.exports = router;
